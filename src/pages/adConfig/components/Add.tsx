import {DatePicker, Form, Input, message, Modal} from 'antd';
import React, {useEffect} from 'react';
import {save} from '../service';
import moment from "moment";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
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
      width={800}
      destroyOnClose
      maskClosable={false}
      open={open}
      title="添加广告"
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
        <Form.Item label="媒体ID" name="mediaId">
          <Input />
        </Form.Item>
        <Form.Item label="开屏广告ID" name="splashAdId">
          <Input />
        </Form.Item>
        <Form.Item label="横幅广告ID" name="bannerAdId">
          <Input />
        </Form.Item>
        <Form.Item label="模板广告ID" name="templateAdId">
          <Input />
        </Form.Item>
        <Form.Item label="插屏广告ID" name="interAdId">
          <Input />
        </Form.Item>
        <Form.Item label="信息流广告ID" name="feedAdId">
          <Input />
        </Form.Item>
        <Form.Item label="模板视频信息流广告ID" name="videoFeedAdId">
          <Input />
        </Form.Item>
        <Form.Item label="全屏视频广告ID" name="fullScreenVideoAdId">
          <Input />
        </Form.Item>
        <Form.Item label="激励视频广告ID" name="rewardVideoAdId">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
