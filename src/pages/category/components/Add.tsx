import {Form, Input, InputNumber, message, Modal, TreeSelect} from 'antd';
import React, {useEffect, useState} from 'react';
import {save, tree} from '../service';
// @ts-ignore
import {DefaultOptionType} from "rc-select/es/Select";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

type AddProps = {
  open: boolean;
  onClose: () => void;
  values?: Record<string, any>;
};

const Add: React.FC<AddProps> = ({ open, values, onClose }) => {
  const [form] = Form.useForm();
  const [data,setData] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    form.setFieldsValue(values || {});
    tree().then(result=>{
      setData(result.data);
    })
  }, []);
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title="添加活动"
      onOk={() => {
        form.validateFields().then((formValues) => {
          save(formValues).then((result) => {
            if (result.code === 0) {
              message.success(result.msg).then();
              onClose();
            } else {
              message.error(result.msg).then();
            }
          });
        });
      }}
      onCancel={onClose}
    >
      <Form form={form} {...layout}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="上级分类" name="parentId">
          <TreeSelect
            disabled={values?.id}
            showSearch
            filterTreeNode={(inputValue: string, treeNode: DefaultOptionType)=>treeNode.title.indexOf(inputValue)>=0}
            style={{ width: '100%' }}
            treeDefaultExpandAll
            fieldNames={{label:'title',value:'key'}}
            treeData={data}
          />
        </Form.Item>
        <Form.Item label="分类" name="name" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="序号" name="order">
          <InputNumber min={0} style={{width:'100%'}} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
