import {DatePicker, Form, Input, message, Modal} from 'antd';
import React, {useEffect} from 'react';
import {save} from '../service';
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
    if(values){
      form.setFieldsValue({
        rangeDate:[moment(values.beginDate),moment(values.endDate)]
      })
    }
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
        <Form.Item label="图片" name="image" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name="title" >
          <Input />
        </Form.Item>
        <Form.Item label="有效时间" name="rangeDate" rules={[{ required: true, message: '必填' }]}>
          <DatePicker.RangePicker format="YYYY-MM-DD 00:00:00" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
