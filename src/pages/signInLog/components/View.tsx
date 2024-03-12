import {list} from '../service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, Modal} from 'antd';
import React, {useRef} from 'react';

export default ({memberId,username,open,onClose}:{memberId: number,username: string,open: boolean,onClose:()=>void}) => {

  const actionRef = useRef<ActionType>();
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
  ];

  return (
    <Modal style={{top:'1%'}} open={open} styles={{
      body:{
        padding:0
      }
    }} onCancel={onClose} footer={false}>
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        cardProps={false}
        rowKey="id"
        bordered
        search={false}
        size="small"
        params={{
          memberId
        }}
        headerTitle={`${username} 的签到记录`}
        request={list}
        columns={columns}
      />
    </Modal>
  );
};
