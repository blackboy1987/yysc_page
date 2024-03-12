import {list} from './service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {useRef, useState} from 'react';
import View from "./components/View";

export default () => {
  const actionRef = useRef<ActionType>();
  const [values, setValues] = useState<Record<string, any>>({});
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '会员',
      dataIndex: 'username',
    },
    {
      title: '奖励积分',
      dataIndex: 'rewardPoints',
    },
    {
      title: '签到IP',
      dataIndex: 'ip',
    },
    {
      title: '签到时间',
      dataIndex: 'createdDate',
      hideInSearch: true,
      width: 150,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 80,
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="view"
          size="small"
          type="primary"
          onClick={()=>{
            setViewModalVisible(true);
            setValues(record)
          }}
        >
          查看全部
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        rowKey="id"
        bordered
        search={false}
        size="small"
        request={list}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="add">刷新</Button>,
        ]}
      />
      {
        viewModalVisible && Object.keys(values).length>0 ? (
          <View open={viewModalVisible} onClose={()=>{
            setViewModalVisible(false);
            setValues({})
          }} memberId={values.memberId} username={values.username} />
        ) : null
      }
    </PageContainer>
  );
};
