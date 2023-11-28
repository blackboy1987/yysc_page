import {Form, Input, InputNumber, message, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {save, tree} from '../service';

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
  categoryId: number;
  onClose: () => void;
  values?: Record<string, any>;
};

const Add: React.FC<AddProps> = ({ open,categoryId, values, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(values || {
      categoryId,
    });
  }, []);
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title="添加/修改字典数据"
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
        <Form.Item style={{display:'none'}} name="categoryId" rules={[{ required: true, message: '必填' }]} initialValue={categoryId}>
          <Input />
        </Form.Item>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '必填' }]}>
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
