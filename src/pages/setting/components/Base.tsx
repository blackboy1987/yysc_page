import {Button, Form, Input} from "antd";

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 20 },
};
const Base = () =>{
  const [form] = Form.useForm();
  return (
    <Form form={form} {...layout}>
      <Form.Item name="appName" label="应用名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" block>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Base;
