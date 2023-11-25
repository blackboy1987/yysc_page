import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import type {TabsProps} from 'antd';
import {Card, Tabs} from 'antd';
import Base from "./components/Base";

export default () => {
  const [key,setKey] = useState<string>("1")
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本设置',
      children:<Base />
    },
    {
      key: '2',
      label: '首页底部栏',
    },
    {
      key: '3',
      label: '首页顶部栏',
    },
    {
      key: '4',
      label: '首页中部工具栏',
    },
    {
      key: '5',
      label: '广场顶部栏',
    },
    {
      key: '6',
      label: '广场推荐',
    },
    {
      key: '7',
      label: '我的工具栏',
    },
  ];
  return (
    <PageContainer title={false}>
      <Card>
        <Tabs
          onChange={activeKey=>setKey(activeKey)}
          defaultActiveKey={key}
          tabPosition='left'
          style={{height:window.innerHeight-160,overflowY:'auto'}}
          items={items}
        />
      </Card>
    </PageContainer>
  );
};
