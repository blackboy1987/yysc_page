import {list} from './service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useRef} from 'react';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '操作人',
      dataIndex: 'username',
      width:120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width:120,
    },
    {
      title: '请求地址',
      dataIndex: 'requestUrl',
      hideInSearch: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      width:80,
      hideInSearch: true,
    },
    {
      title: '操作事件',
      dataIndex: 'createdDate',
      hideInSearch: true,
      width: 150,
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        rowKey="id"
        bordered
        size="small"
        tableAlertRender={false}
        request={list}
        columns={columns}
      />
    </PageContainer>
  );
};
