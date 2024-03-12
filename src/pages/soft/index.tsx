import {list, remove, tree,audit} from './service';
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
  const [categoryId,setCategoryId] = useState<React.Key | null>(null);

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
  const handleAudit = (id: number,status: 1|2) => {
    Modal.confirm({
      title: '提醒',
      content: '您正在审核数据',
      onOk: () => {
        audit({
          ids: id,
          status,
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
      title: 'logo',
      dataIndex: 'logo',
      width:80,
      hideInSearch: true,
      valueType:'image',
      fieldProps:{
        width:60,
      }
    },
    {
      title: '软件名',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:60,
      valueEnum:{
        0:{
          text:'待审核',
        },
        1:{
          text:'已通过',
        },
        2:{
          text:'已拒绝',
        },
        100:{
          text:'草稿',
        },
       101:{
          text:'已删除',
        },
        102:{
          text:'已删除',
        },
      },
    },
    {
      title: '用户',
      width:60,
      hideInSearch: true,
      dataIndex: 'username',
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
      width: 180,
      valueType: 'option',
      render: (_, record) => {
        const array = [];
        array.push(<Button
          key="edit"
          size="small"
          type="primary"
          onClick={() => {
            setAddModalVisible(true);
            setValues(record);
          }}
        >
          修改
        </Button>);
        array.push(<Button
          key="remove"
          size="small"
          type="primary"
          danger
          onClick={() => handleRemove(record.id)}
        >
          删除
        </Button>)
        if(record.status==0 || record.status==2){
          array.push((record.status==0 || record.status == 2) && <Button
            key="pass"
            size="small"
            type="primary"
            onClick={() => handleAudit(record.id,1)}
          >
            通过
          </Button>)
        }else{
          array.push((record.status==0 || record.status == 2) && <Button
            key="reject"
            size="small"
            type="primary"
            danger
            onClick={() => handleAudit(record.id,2)}
          >
            拒绝
          </Button>)
        }
        return array;
      },
    },
  ];

  return (
    <PageContainer title={false}>
      <Row gutter={16}>
        <Col span={4}>
          <Card size='small'>
            <Tree
              showLine
              blockNode
              defaultExpandAll
              style={{height:window.innerHeight-120,overflowY:'auto'}}
              treeData={data}
              onSelect={e=>{
                if(e.length>0) {
                  setCategoryId(e[0]);
                }else {
                  setCategoryId(null)
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
              categoryId,
            }}
            request={list}
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
