import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {Modal} from 'antd';
import {list} from "@/pages/softDownloadLog/service";

type AddProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const DownloadLog: React.FC<AddProps> = ({ open, values, onClose }) => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '用户',
      width:60,
      hideInSearch: true,
      dataIndex: 'username',
    },
    {
      title: '操作时间',
      dataIndex: 'createdDate',
      hideInSearch: true,
      width: 150,
      valueType: 'dateTime',
    },
  ];


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
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        cardProps={false}
        rowKey="id"
        bordered
        search={false}
        size="small"
        tableAlertRender={false}
        params={{
          softId: values.id,
        }}
        request={list}
        scroll={{y:window.innerHeight-340}}
        columns={columns}
      />
    </Modal>
  );
};

export default DownloadLog;
