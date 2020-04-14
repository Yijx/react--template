import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zrender from 'zrender';

class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointRadius: 4, // 小圆点大小
            x: 300 / 2, // 圆心坐标
            y: 300 / 2,
            maxRadius: 140, // 最大圆半径
            circleNumbers: 5, // 同心圆数量
            circleColors: ['#000c65', '#12239f', 'rgba(18, 35, 159, 0.5)', 'rgba(18, 35, 159, 0.3)', 'rgba(24, 117, 240, 0.35)'], // 同心圆圆环颜色
            zr: null,
            data: [60, 70, 80, 90, 50, 40, 60]
        };
    }

    drawBackgroundCircle = () => {
        let { x, y, avgRadius, zr, circleNumbers, circleColors } = this.state;
        for (let i = 1; i <= circleNumbers; i++) {
            let circle = new zrender.Circle({
                z: -1 * i,
                cursor: 'default',
                shape: {
                    cx: x,
                    cy: y,
                    r: avgRadius * i
                },
                style: {
                    fill: circleColors[i - 1],
                    stroke: '#97B6FF'
                }
            });
            zr.add(circle);
        }
    }

    drawBackgroundDash = () => {
        let { x, y, data, maxRadius, startAngle, endAngle, avgLineRadian, zr } = this.state;
        for (let i = startAngle; i <= endAngle; i += avgLineRadian) {
            let [x2, y2] = this.computedPointCoordinate(x, y, maxRadius, i);
            let line = new zrender.Line({
                cursor: 'default',
                shape: {
                    x1: x,
                    y1: y,
                    x2,
                    y2
                },
                style: {
                    fill: 'none',
                    stroke: '#449BFF',
                    lineDash: [5]
                }
                        
            });
            zr.add(line);
        }
    }

    drawLine = () => {
        let { x, y, maxRadius, startAngle, endAngle, avgLineRadian, zr, data } = this.state;
        let polylinePoints = [];
        for (let i = startAngle, j = 0; i <= endAngle; j++, i += avgLineRadian) {
            let nextPoint = this.computedPointCoordinate(x, y, maxRadius * (data[j] / 100), i);      
            polylinePoints.push(nextPoint);
        }
        let polygon = new zrender.Polygon({
            shape: {
                points: polylinePoints
            },
            style: {
                fill: 'rgba(255,77,77,0.5)',
                stroke: '#FF4D4D',
                lineWidth: 2
            }
            
        });
        zr.add(polygon);
        polygon.on('mouseover', () => polygon.attr('style', { fill: 'rgba(255,77,77,0.7)' }));
        polygon.on('mouseout', () => polygon.attr('style', { fill: 'rgba(255,77,77,0.5)' }));
    }

    drawCircle = () => {
        let { pointRadius, startAngle, endAngle, avgLineRadian, maxRadius, x, y, data, zr } = this.state;
        for (let i = startAngle, j = 0; i <= endAngle; j++, i += avgLineRadian) {
            let [cx, cy] = this.computedPointCoordinate(x, y, maxRadius * (data[j] / 100), i);
            let circle = new zrender.Circle({
                shape: { cx, cy, r: pointRadius },
                style: {
                    fill: '#fff',
                    stroke: '#FF4D4D',
                    lineWidth: 2
                }
            });
            zr.add(circle);
            circle.on('mouseover', () => {
                circle.animateTo({
                    shape: {
                        r: pointRadius + 2
                    },
                    style: {
                        fill: '#FF4D4D'
                    }
                }, 100, 0, 'linear');
            });
            circle.on('mouseout', () =>  {
                circle.animateTo({
                    shape: {
                        r: pointRadius
                    },
                    style: {
                        fill: '#fff'
                    }
                }, 100, 0, 'linear');
            });
        }
    }

    componentDidMount() {
        let { maxRadius, circleNumbers, data } = this.state;
        let avgRadius = maxRadius / circleNumbers; // 同心圆半径间隔
        let zr = zrender.init(document.getElementById('main'));
        let startAngle = 270; // 起始角度
        let endAngle = 360 + startAngle; // 终止角度
        let avgLineRadian = Math.ceil(360 / data.length); // 虚线之间间隔角度 
        this.setState({ zr, avgRadius, startAngle, endAngle, avgLineRadian }, () => {
            // ----- 绘制同心圆圈
            this.drawBackgroundCircle();
            // ----- 绘制虚线
            this.drawBackgroundDash();
            // ----- 线段
            this.drawLine();
            // ----圆点
            this.drawCircle();
        });

    }

    // 根据圆点、半径、角度，计算圆边上一点坐标
    computedPointCoordinate = (x, y, r, angle) => {
        let pointX = x + r * Math.cos(angle * Math.PI / 180);
        let pointY = y + r * Math.sin(angle * Math.PI / 180);
        return [Math.round(pointX), Math.round(pointY)];
    };

    render() {
        return (
            <div id="main" style={{ width: '300px', height: '300px', border: '1px solid' }}></div>
        );
    }
}

Page3.propTypes = {
    data: PropTypes.array,
    lebel: PropTypes.array
};

export default Page3;
