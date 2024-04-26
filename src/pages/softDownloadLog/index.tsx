import {list} from './service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useRef} from 'react';

export default () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '软件名',
      dataIndex: 'name',
    },
    {
      title: '用户',
      width:60,
      hideInSearch: true,
      dataIndex: 'username',
    },
    {
      title: '操作时间',
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
        scroll={{y:window.innerHeight-340}}
        columns={columns}
      />
    </PageContainer>
  );
};
