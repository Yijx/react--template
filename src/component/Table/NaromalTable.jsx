import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './Table';

const columns = [
    {
        title: '序号',
        dataIndex: 'serial',
        key: 'serial'
    },
    {
        title: '服务事项名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '变更类型',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time'
    },
    {
        title: '申请状态',
        dataIndex: 'applicationStatus',
        key: 'applicationStatus'
    },
    {
        title: '办理状态',
        dataIndex: 'processingTime',
        key: 'processingTime'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render(text, record) {
            return (
                <Fragment>
                    <span>添加</span> <span>删除</span>
                </Fragment>
            );
        }
    }
];
const data = [
    {
        serial: 1,
        name: 'name',
        type: 'type',
        time: 'time',
        processingTime: 'processingTime',
        applicationStatus: 'applicationStatus'
    },
    {
        serial: 2,
        name: 'name',
        type: 'type',
        time: 'time',
        processingTime: 'processingTimeprocessingTimeprocessingTimeprocessingTime',
        applicationStatus: 'applicationStatus'
    },
    {
        serial: 3,
        name: 'name',
        type: 'type',
        time: 'time',
        processingTime: 'processingTime',
        applicationStatus: 'applicationStatus'
    }
];
class NoramalTable extends Component {
    render() {
        return (
            <Table 
                columns={columns} 
                dataSource={data} 
                rowKey={record => record.serial} 
                bordered
                pagination={false}
                className="noramalTable"
            />
        );
    }
}
NoramalTable.propTypes = {
    data: PropTypes.array.isRequired
};
export default NoramalTable;