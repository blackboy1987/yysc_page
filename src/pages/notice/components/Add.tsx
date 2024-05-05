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
    if(Object.keys(values||{}).length>0){
      form.setFieldsValue(values);
      form.setFieldsValue({
        rangeDate:[moment(values?.beginDate||new Date()),moment(values?.endDate||new Date())],
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
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true, message: '必填' }]}>
          <Input.TextArea autoSize={{minRows:8,maxRows:8}} />
        </Form.Item>
        <Form.Item label="有效时间" name="rangeDate" rules={[{ required: true, message: '必填' }]}>
          <DatePicker.RangePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
