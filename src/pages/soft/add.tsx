import {FooterToolbar, PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Select, TreeSelect, message} from "antd";
import MyEditor from "@/components/MyEditor";
import {save, tree} from "@/pages/soft/service";
import ImageUpload from '@/components/ImageUpload';
const layout = {
  labelCol: {
    xs: {span: 6},
  },
  wrapperCol: {
    xs: {span: 18},
  },
};
export default () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Record<string, any>[]>([]);

  useEffect(()=>{
    // 拉取分类
    tree({}).then(result=>{
      setCategories(result.data);
    })
  },[])

  return (
    <PageContainer title={false} breadcrumb={{}}>
      <Form form={form} {...layout} scrollToFirstError>
        <Form.Item label='软件名称' name='name' rules={[{required:true,message:'必填'}]}>
          <Input />
        </Form.Item>
        <Form.Item label='软件图标' name='logo' rules={[{required:true,message:'必填'}]}>
          <Input addonAfter={<ImageUpload onSuccess={url=>{
            form.setFieldValue("logo",url);
          }} />}/>
        </Form.Item>
        <Form.Item label='软件大小' name='size' rules={[{required:true,message:'必填'}]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label='地址1' name='downloadUrl1' rules={[{required:true,message:'必填'}]}>
          <Input />
        </Form.Item>
        <Form.Item label='地址2' name='downloadUrl2' rules={[{required:true,message:'必填'}]}>
          <Input />
        </Form.Item>
        <Form.Item label='图片1' name='img1' rules={[{required:true,message:'必填'}]}>
          <Input addonAfter={<ImageUpload onSuccess={url=>{
            form.setFieldValue("img1",url);
          }} />} />
        </Form.Item>
        <Form.Item label='图片2' name='img2' rules={[{required:true,message:'必填'}]}>
          <Input addonAfter={<ImageUpload onSuccess={url=>{
            form.setFieldValue("img1",url);
          }} />} />
        </Form.Item>
        <Form.Item label='图片3' name='img3' rules={[{required:true,message:'必填'}]}>
          <Input addonAfter={<ImageUpload onSuccess={url=>{
            form.setFieldValue("img1",url);
          }} />} />
        </Form.Item>
        <Form.Item label='分类' name='categoryId' rules={[{required:true,message:'必填'}]}>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            treeLine
            treeData={categories.map(item=>{
              if(item.children && item.children.length>0){
                return {
                  value: item.key,
                  title: item.title,
                  disabled: true,
                  children: item.children.map((child:{key: number,title: string})=>({
                    value: child.key,
                    title: child.title,
                  }))
                }
              }
              return {
                value: item.key,
                title: item.title,
              }
            })}
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item name='content' style={{display:'none'}}>
          <Input />
        </Form.Item>
        <MyEditor value='' onChange={content=>{
            form.setFieldValue("content",content);
          }} />
      </Form>

      <FooterToolbar>
        <Button type='primary' onClick={()=>{
          form.validateFields().then(formValues=>{
            save(formValues).then(result=>{
              if(result.code){
                message.success(result.data);
                form.resetFields()
              }else{
                message.error("添加失败");
              }
            })
          })
        }}>保存</Button>
      </FooterToolbar>
    </PageContainer>
  );
};
