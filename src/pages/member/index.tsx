import {list, remove} from './service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import AdjustPoint from "./components/AdjustPoint";
import PointLog from "./components/PointLog";

export default () => {
  const actionRef = useRef<ActionType>();
  const [values, setValues] = useState<Record<string, any>>({});
  const [adjustPointModalVisible, setAdjustPointModalVisible] = useState<boolean>(false);
  const [pointLogModalVisible, setPointLogModalVisible] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const handleRemove = (id?: number) => {
    Modal.confirm({
      title: '提醒',
      content: '您正在删除数据',
      onOk: () => {
        remove({
          ids: id || selectedRowKeys.join(','),
        }).then((result) => {
          if (result.code === 0) {
            message.success(result.msg).then();
            actionRef.current?.reload();
          } else {
            message.error(result.msg).then();
          }
        });
      },
    });
  };
  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '昵称',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'image',
      valueType: "image",
      hideInSearch: true,
    },
    {
      title: '积分',
      width: 80,
      dataIndex: 'point',
    },
    {
      title: '剩余积分',
      width: 80,
      dataIndex: 'remainPoint',
      renderText:(_,record)=><a onClick={()=>{
        setValues(record);
        setPointLogModalVisible(true);
      }}>{record.remainPoint}</a>
    },
    {
      title: '累计签到天数',
      width: 120,
      dataIndex: 'signInDays',
    },
    {
      title: '连续签到天数',
      width: 120,
      dataIndex: 'continuousSignInDays',
    },
    {
      title: '最近签到时间',
      dataIndex: 'signInDate',
      hideInSearch: true,
      width: 150,
      valueType: 'dateTime',
    },
    {
      title: '添加时间',
      dataIndex: 'createdDate',
      hideInSearch: true,
      width: 150,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="remove"
          size="small"
          type="primary"
          onClick={() => {
            setAdjustPointModalVisible(true);
            setValues(record);
          }}
        >
          积分调整
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
        tableAlertRender={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
        toolBarRender={() => [
          <Button
            disabled={selectedRowKeys.length === 0}
            type="primary"
            danger
            key="remove"
            onClick={() => handleRemove()}
          >
            删除
          </Button>,
        ]}
        request={list}
        columns={columns}
      />
      {adjustPointModalVisible && Object.keys(values).length>0 ? (
        <AdjustPoint
          values={values}
          open={adjustPointModalVisible}
          onClose={() => {
            setAdjustPointModalVisible(false);
            setValues({});
          }}
        />
      ) : null}
      {pointLogModalVisible && Object.keys(values).length>0 ? (
        <PointLog
          values={values}
          open={pointLogModalVisible}
          onClose={() => {
            setPointLogModalVisible(false);
            setValues({});
          }}
        />
      ) : null}
    </PageContainer>
  );
};
