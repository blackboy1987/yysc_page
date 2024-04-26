import {Modal} from 'antd';
import React from 'react';
import {pointLog} from '../service';
import {ProTable} from "@ant-design/pro-components";

type PointLogProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const PointLog: React.FC<PointLogProps> = ({ open, values, onClose }) => {
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title={`${values.username} 积分明细`}
      footer={null}
      onCancel={onClose}
    >
      <ProTable
        search={false}
        options={false}
        cardProps={false}
        bordered
        params={{
          memberId: values.id,
        }}
        request={pointLog}
        size='small'
        columns={[{
          title:'积分',
          width:80,
          dataIndex:'point',
        },{
          title:'类型',
          width:80,
          dataIndex:'type',
        },{
          title:'备注',
          dataIndex:'memo',
        },{
          title:'变动时间',
          width:150,
          dataIndex:'createdDate',
        },]}
      />
    </Modal>
  );
};

export default PointLog;
