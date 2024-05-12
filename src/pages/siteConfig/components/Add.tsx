import {Card, Col, Form, Input, InputNumber, message, Modal, Row, Switch} from 'antd';
import React, {useEffect} from 'react';
import {save} from '../service';
import moment from "moment";

const layout = {
  labelCol: {
    span: 4,
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
      width='90%'
      style={{top:'1%'}}
      destroyOnClose
      maskClosable={false}
      open={open}
      title="站点配置"
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
        <Card title="基础配置" size='small' style={{marginBottom:8}}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="站点名称" name="siteName" rules={[{required:true,message:'必填'}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="站点logo" name="siteLogo" rules={[{required:true,message:'必填'}]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="基础广告配置" size='small' style={{marginBottom:8}}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="模板信息流" name="adType1">
                <Switch checkedChildren='开始' unCheckedChildren='关闭' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="插屏广告" name="adType4">
                <Switch checkedChildren='开始' unCheckedChildren='关闭' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="激励视频" name="adType5">
                <Switch checkedChildren='开始' unCheckedChildren='关闭' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="开屏广告" name="adType6">
                <Switch checkedChildren='开始' unCheckedChildren='关闭' />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="会员广告配置" size='small' style={{marginBottom:8}}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="模板信息流" name="memberAdType1Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="插屏广告" name="memberAdType4Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="激励视频" name="memberAdType5Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="开屏广告" name="memberAdType6Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="游客广告配置" size='small' style={{marginBottom:8}}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="模板信息流" name="adType1Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="插屏广告" name="adType4Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="激励视频" name="adType5Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="开屏广告" name="adType6Count" rules={[{required:true,message:'必填'}]}>
                <InputNumber min={0} step={1} precision={0} style={{width:'80%'}} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default Add;
