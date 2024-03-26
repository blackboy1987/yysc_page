import { list, remove } from './service';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import Add from './components/Add';
import moment from "moment";

export default () => {
  const actionRef = useRef<ActionType>();
  const [values, setValues] = useState<Record<string, any>>({});
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
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
      title: '图片',
      dataIndex: 'image',
      valueType:'image',
      hideInSearch: true,
      fieldProps:{
        width:100
      }
    },
    {
      title: '跳转地址',
      dataIndex: 'url',
      hideInSearch: true,
      width: 80,
      renderText:(text,record)=><a href={record.url} target="_blank" rel="noreferrer">查看</a>
    },
    {
      title: '有效时间',
      dataIndex: 'beginDate',
      hideInSearch: true,
      width:180,
      renderText:(_,record)=><span>{moment(record.beginDate).format("YYYY-MM-DD")}~{moment(record.endDate).format("YYYY-MM-DD")}</span>
    },
    {
      title: '序号',
      dataIndex: 'order',
      hideInSearch: true,
      width:50,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 60,
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          size="small"
          type="primary"
          onClick={() => {
            setAddModalVisible(true);
            setValues(record);
          }}
        >
          修改
        </Button>,
        <Button
          key="remove"
          size="small"
          type="primary"
          danger
          onClick={() => handleRemove(record.id)}
        >
          删除
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
        search={false}
        bordered
        size="small"
        tableAlertRender={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
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
      {addModalVisible ? (
        <Add
          values={values}
          open={addModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            actionRef.current?.reload();
            setValues({});
          }}
        />
      ) : null}
    </PageContainer>
  );
};
