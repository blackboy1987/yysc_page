import {DatePicker, Form, Input, InputNumber, message, Modal} from 'antd';
import React, { useEffect } from 'react';
import { save } from '../service';
import ImageUpload from "@/components/ImageUpload";
import moment from "moment";

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
  useEffect(() => {
    form.setFieldsValue(values || {});
    if(Object.keys(values).length>0){
      form.setFieldsValue(values);
      form.setFieldsValue({
        rangeDate:[moment(values.beginDate||new Date()),moment(values.endDate||new Date())],
      })
    }
  }, []);
  return (
    <Modal
      width={800}
      destroyOnClose
      maskClosable={false}
      open={open}
      title="添加/修改轮播图"
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
        <Form.Item label="图片" name="image" rules={[{ required: true, message: '必填' }]}>
          <Input.Search enterButton={<ImageUpload onSuccess={url=>form.setFieldsValue({
            image: url,
          })} />} />
        </Form.Item>
        <Form.Item label="跳转地址" name="url" >
          <Input />
        </Form.Item>
        <Form.Item label="有效时间" name="rangeDate" rules={[{ required: true, message: '必填' }]}>
          <DatePicker.RangePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="序号" name="order" rules={[{ required: true, message: '必填' }]}>
          <InputNumber min={1} step={1} precision={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
