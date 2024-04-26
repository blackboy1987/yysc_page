import {Form, Input, InputNumber, message, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {point, changePoint} from '../service';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

type AdjustPointProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const AdjustPoint: React.FC<AdjustPointProps> = ({ open, values, onClose }) => {
  const [form] = Form.useForm();
  const [data,setData] = useState<Record<string, any>>({})
  useEffect(() => {
    if(values){
      // 获取积分数据
      point({
        memberId: values.id,
      }).then(result=>{
        setData(result.data);
      })
    }
  }, []);
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title={`调整 ${values.username} 积分`}
      onOk={() => {
        form.validateFields().then((formValues) => {
          changePoint(formValues).then((result) => {
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
        <Form.Item name="memberId" initialValue={values.id} style={{display:'none'}}>
          <Input />
        </Form.Item>
        <Form.Item label="总积分">
          {data.point}
        </Form.Item>
        <Form.Item label="剩余积分">
          {data.remainPoint}
        </Form.Item>
        <Form.Item label="调整积分" name='point' rules={[{required: true,message:'必填'}]}>
          <InputNumber step={0} precision={0} />
        </Form.Item>
        <Form.Item label="备注" name='memo' rules={[{required: true,message:'必填'}]}>
          <Input.TextArea autoSize={{minRows: 3, maxRows: 3}} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdjustPoint;
