import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import {Constants} from "@/util/constants";
import React from "react";

type ImageUploadProps = {
  onSuccess: (url: string) => void;
}
const ImageUpload:React.FC<ImageUploadProps> = ({onSuccess}) =>{

  const props: UploadProps = {
    name: 'file',
    multiple:false,
    accept:'image/png',
    action: Constants.uploadUrl,
    showUploadList: false,
    headers: {
      token: localStorage.getItem("token")||'',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success("上传成功").then();
        onSuccess(info.file.response.data);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <span style={{cursor:'pointer'}}>选择文件</span>
    </Upload>
  )
}

export default ImageUpload;
