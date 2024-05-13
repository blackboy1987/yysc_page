import {Form, Input, InputNumber, message, Modal, TreeSelect} from 'antd';
import React, {useEffect, useState} from 'react';
import {save, tree} from '../service';
import moment from "moment";
import SoftDownloadLog from "@/pages/softDownloadLog";

type AddProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const DownloadLog: React.FC<AddProps> = ({ open, values, onClose }) => {
  useEffect(() => {

  }, []);
  return (
    <Modal
      width='80%'
      style={{top:'1%'}}
      destroyOnClose
      maskClosable={false}
      open={open}
      title={`${values.name} 下载记录`}
      footer={null}
      onCancel={onClose}
    >
      <SoftDownloadLog softId={values.id} />
    </Modal>
  );
};

export default DownloadLog;
