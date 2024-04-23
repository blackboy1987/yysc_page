import {Modal} from 'antd';
import React, {useEffect} from 'react';
import SoftViewLog from "@/pages/softViewLog";

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
      title={`${values.name} 浏览记录`}
      footer={null}
      onCancel={onClose}
    >
      <SoftViewLog softId={values.id} />
    </Modal>
  );
};

export default DownloadLog;
