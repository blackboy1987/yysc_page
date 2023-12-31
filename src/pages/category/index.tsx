import {list, remove, tree} from './service';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, Card, Col, message, Modal, Row, Tree} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import Add from './components/Add';

export default () => {
  const actionRef = useRef<ActionType>();
  const [values, setValues] = useState<Record<string, any>>({});
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [data,setData] = useState<Record<string, any>[]>([]);
  const [parentId,setParentId] = useState<number>(0);

  useEffect(()=>{
    tree().then(result=>{
      setData(result.data);
    })
  },[])

  const handleRemove = (id: number) => {
    Modal.confirm({
      title: '提醒',
      content: '您正在删除数据',
      onOk: () => {
        remove({
          ids: id,
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
      title: '分类名',
      dataIndex: 'name',
    },
    {
      title: '序号',
      dataIndex: 'orders',
      hideInSearch: true,
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
      <Row gutter={16}>
        <Col span={4}>
          <Card size='small'>
            <Tree
              blockNode
              defaultExpandAll
              treeData={data}
              onSelect={e=>{
                if(e.length>0) {
                  setParentId(e[0]);
                }else {
                  setParentId(0)
                }
              }}
            />
          </Card>
        </Col>
        <Col span={20}>
          <ProTable<Record<string, any>, Record<string, any>>
            actionRef={actionRef}
            options={false}
            rowKey="id"
            bordered
            size="small"
            tableAlertRender={false}
            toolBarRender={() => [
              <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
                <PlusOutlined /> 新增
              </Button>,
            ]}
            params={{
              parentId,
            }}
            request={list}
            pagination={false}
            scroll={{y:window.innerHeight-340}}
            columns={columns}
          />
        </Col>
      </Row>
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
