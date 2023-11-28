import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Card, Tabs, TabsProps} from 'antd';
import Base from "./components/Base";
import HomeCenterBar from "./components/HomeCenterBar";
import HomeTopBar from "./components/HomeTopBar";
import HomeBottomBar from "./components/HomeBottomBar";

export default () => {
  const [activityKey,setActivityKey] = useState<string>("4")
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本设置',
    },
    {
      key: '2',
      label: '首页顶部栏',
    },
    {
      key: '3',
      label: '首页中部工具栏',
    },
    {
      key: '4',
      label: '首页底部栏',
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
        <div style={{display:'flex'}}>
          <Tabs
            onChange={activeKey=>setActivityKey(activeKey)}
            defaultActiveKey={activityKey}
            tabPosition='left'
            style={{height:window.innerHeight-160,overflowY:'auto'}}
            items={items}
          />
          <div style={{flex:1}}>
            {
              activityKey==="1" ? (<Base />) : null
            }
            {
              activityKey==="2" ? (<HomeTopBar />) : null
            }
            {
              activityKey==="3" ? (<HomeCenterBar />) : null
            }
            {
              activityKey==="4" ? (<HomeBottomBar />) : null
            }
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};
