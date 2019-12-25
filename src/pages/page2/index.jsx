import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';

class Page2 extends Component {
    constructor(props) {
        super(props);
        this.map = createRef();
    }
    componentDidMount() {
        // 创建地图
        var map = new AMap.Map('container', {
            // pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
            // viewMode: '3D', // 地图模式
            zoom: 6.5,
            zooms: [6.5, 18],
            center: new AMap.LngLat(104.065735, 30.659462) // 成都市
        });

        // just some colors
        function getData(callback = () => { }, name = '四川省') {
            AMap.plugin('AMap.DistrictSearch', function() {
                var search = new AMap.DistrictSearch();
                search.search(name, function(status, data) {
                    console.log(data);
                    if (status === 'complete') {
                        var positions = [];
                        var provinces = data['districtList'][0]['districtList'];
                        for (var i = 0; i < provinces.length; i += 1) {
                            positions.push({
                                center: provinces[i].center,
                                radius: Math.max(2, Math.floor(Math.random() * 10))
                            });
                        }
                        callback(positions);
                    }
                });
            });
        }

        function addLayer(positions) {
            AMap.plugin('AMap.CustomLayer', function() {
                if (window.lastCustomLayer) {
                    window.lastCustomLayer.setMap(null);
                }
                var canvas = document.createElement('canvas');
                var customLayer = new AMap.CustomLayer(canvas, {
                    zooms: [7, 18],
                    alwaysRender: true, // 缩放过程中是否重绘，复杂绘制建议设为false
                    zIndex: 120
                });
                var onRender = function() {
                    var retina = AMap.Browser.retina;
                    var size = map.getSize(); // resize
                    var width = size.width;
                    var height = size.height;
                    canvas.style.width = width + 'px';
                    canvas.style.height = height + 'px';
                    if (retina) { // 高清适配
                        width *= 2;
                        height *= 2;
                    }
                    canvas.width = width;
                    canvas.height = height; // 清除画布
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#08f';
                    ctx.strokeStyle = '#fff';
                    ctx.beginPath();
                    for (var i = 0; i < positions.length; i += 1) {
                        var center = positions[i].center;
                        var pos = map.lngLatToContainer(center);
                        var r = positions[i].radius;
                        if (retina) {
                            pos = pos.multiplyBy(2);
                            r *= 2;
                        }
                        ctx.moveTo(pos.x + r, pos.y);
                        ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
                    }
                    ctx.lineWidth = retina ? 6 : 3;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                };
                customLayer.render = onRender;
                customLayer.setMap(map);
                window.lastCustomLayer = customLayer;
            });
        }

        getData(addLayer);

        var colors = [
            '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00',
            '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707',
            '#651067', '#329262', '#5574a6', '#3b3eac'
        ];

        AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function(DistrictExplorer, $) {

            // 创建一个实例
            var districtExplorer = window.districtExplorer = new DistrictExplorer({
                eventSupport: true, // 打开事件支持
                map: map
            });

            // 当前聚焦的区域
            var currentAreaNode = null;

            // 鼠标hover提示内容
            var $tipMarkerContent = $('<div class="tipMarker top"></div>');

            var tipMarker = new AMap.Marker({
                content: $tipMarkerContent.get(0),
                offset: new AMap.Pixel(0, 0),
                bubble: true
            });

            // 根据Hover状态设置相关样式
            function toggleHoverFeature(feature, isHover, position) {

                tipMarker.setMap(isHover ? map : null);

                if (!feature) {
                    return;
                }

                var props = feature.properties;

                if (isHover) {

                    // 更新提示内容
                    $tipMarkerContent.html(props.adcode + ': ' + props.name);
                    // 更新位置
                    tipMarker.setPosition(position || props.center);
                }

                // 更新相关多边形的样式
                var polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
                for (var i = 0, len = polys.length; i < len; i++) {
                    polys[i].setOptions({
                        fillOpacity: isHover ? 0.5 : 0.2
                    });
                }
            }

            // 监听feature的hover事件
            districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
                toggleHoverFeature(feature, e.type === 'featureMouseover',
                    e.originalEvent ? e.originalEvent.lnglat : null);
            });

            // 监听鼠标在feature上滑动
            districtExplorer.on('featureMousemove', function(e, feature) {
                // 更新提示位置
                tipMarker.setPosition(e.originalEvent.lnglat);
            });

            // feature被点击
            districtExplorer.on('featureClick', function(e, feature) {

                var props = feature.properties;
                // 绘制下级节点
                getData(addLayer, props.name);
                // 如果存在子节点
                // if (props.childrenNum > 0) {
                // 切换聚焦区域
                switch2AreaNode(props.adcode);
                // }
            });

            // 外部区域被点击
            districtExplorer.on('outsideClick', function(e) {

                districtExplorer.locatePosition(e.originalEvent.lnglat, function(error,
                    routeFeatures) {

                    if (routeFeatures && routeFeatures.length > 1) {
                        // 切换到省级区域
                        // switch2AreaNode(routeFeatures[1].properties.adcode);
                        getData(addLayer);
                        switch2AreaNode(510000);
                    } else {
                        // 切换到全国
                        switch2AreaNode(100000);
                    }

                }, {
                    levelLimit: 2
                });
            });

            // 绘制某个区域的边界
            function renderAreaPolygons(areaNode) {

                // 更新地图视野
                map.setBounds(areaNode.getBounds(), null, null, true);

                // 清除已有的绘制内容
                districtExplorer.clearFeaturePolygons();

                // 绘制子区域
                districtExplorer.renderSubFeatures(areaNode, function(feature, i) {

                    var fillColor = colors[i % colors.length];
                    var strokeColor = colors[colors.length - 1 - i % colors.length];

                    return {
                        cursor: 'default',
                        bubble: true,
                        strokeColor: strokeColor, // 线颜色
                        strokeOpacity: 1, // 线透明度
                        strokeWeight: 1, // 线宽
                        fillColor: fillColor, // 填充色
                        fillOpacity: 0.35 // 填充透明度
                    };
                });

                // 绘制父区域
                districtExplorer.renderParentFeature(areaNode, {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: 'black', // 线颜色
                    strokeOpacity: 1, // 线透明度
                    strokeWeight: 1, // 线宽
                    fillColor: null, // 填充色
                    fillOpacity: 0.35 // 填充透明度
                });
            }

            // 切换区域后刷新显示内容
            function refreshAreaNode(areaNode) {

                districtExplorer.setHoverFeature(null);

                renderAreaPolygons(areaNode);

                // 更新选中节点的class
                var $nodeEles = $('#area-tree').find('h2');

                $nodeEles.removeClass('selected');

                var $selectedNode = $nodeEles.filter('h2[data-adcode=' + areaNode.getAdcode() + ']').addClass(
                    'selected');

                // 展开下层节点
                $selectedNode.closest('li').removeClass('hide-sub');

                // 折叠下层的子节点
                $selectedNode.siblings('ul.sublist').children().addClass('hide-sub');
            }

            // 切换区域
            function switch2AreaNode(adcode, callback) {

                if (currentAreaNode && ('' + currentAreaNode.getAdcode() === '' + adcode)) {
                    return;
                }

                loadAreaNode(adcode, function(error, areaNode) {

                    if (error) {

                        if (callback) {
                            callback(error);
                        }

                        return;
                    }

                    currentAreaNode = window.currentAreaNode = areaNode;

                    // 设置当前使用的定位用节点
                    districtExplorer.setAreaNodesForLocating([currentAreaNode]);

                    refreshAreaNode(areaNode);

                    if (callback) {
                        callback(null, areaNode);
                    }
                });
            }

            // 加载区域
            function loadAreaNode(adcode, callback) {
                districtExplorer.loadAreaNode(adcode, function(error, areaNode) {

                    if (error) {

                        if (callback) {
                            callback(error);
                        }

                        console.error(error);

                        return;
                    }

                    // renderAreaPanel(areaNode);

                    if (callback) {
                        callback(null, areaNode);
                    }
                });
            }

            // 全国
            switch2AreaNode(510000);
        });
    }
    render() {
        return (
            <div ref={this.map} id='container' style={{ width: '990px', height: '880px' }}>
                <Link to='/'>page2</Link>
            </div>
        );
    }
}

export default Page2;
