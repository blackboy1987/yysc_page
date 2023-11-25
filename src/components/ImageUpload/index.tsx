import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const ImageUpload = () =>{

  const props: UploadProps = {
    name: 'file',
    accept:'image/png',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      token: localStorage.getItem("token"),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>选择文件</Button>
    </Upload>
  )
}

export default ImageUpload;
