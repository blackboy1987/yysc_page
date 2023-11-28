import {ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Checkbox, Input} from 'antd';
import {useEffect, useState} from 'react';
import ImageUpload from "@/components/ImageUpload";
import {homeBottomBar, homeBottomBarSave} from '../service'

const HomeBottomBar = () =>{
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    homeBottomBar().then(result=>{
      setDataSource(result.data)
    })
  }, []);

  const columns: ProColumns[] = [
    {
      title:'名称',
      dataIndex:'name',
      width:180,
      renderText:(_,record,index)=><Input value={record.name} onChange={e=>{
        const newDataSource = [...dataSource];
        const current = newDataSource.filter((_,index1)=>index1===index);
        if(current && current.length>0){
          current[0].name = e.currentTarget.value;
          setDataSource(newDataSource);
        }
      }} />
    },{
      title:'图片',
      dataIndex: "image",
      renderText:(_,record,index)=>(
        <>
          <Input.Search addonBefore='未选中' value={record.image} enterButton={<ImageUpload onSuccess={url=>{
            const newDataSource = [...dataSource];
            const current = newDataSource.filter((_,index1)=>index1===index);
            if(current && current.length>0){
              current[0].image = url;
              setDataSource(newDataSource);
            }

          }}/>} onChange={e=>{
            const newDataSource = [...dataSource];
            const current = newDataSource.filter((_,index1)=>index1===index);
            if(current && current.length>0){
              current[0].image = e.currentTarget.value;
              setDataSource(newDataSource);
            }
          }} />
          <Input.Search style={{marginTop:8}} addonBefore='选&nbsp;&nbsp;&nbsp;&nbsp;中' value={record.image} enterButton={<ImageUpload onSuccess={url=>{
            const newDataSource = [...dataSource];
            const current = newDataSource.filter((_,index1)=>index1===index);
            if(current && current.length>0){
              current[0].image = url;
              setDataSource(newDataSource);
            }

          }}/>} onChange={e=>{
            const newDataSource = [...dataSource];
            const current = newDataSource.filter((_,index1)=>index1===index);
            if(current && current.length>0){
              current[0].image = e.currentTarget.value;
              setDataSource(newDataSource);
            }
          }} />
        </>
      )
    },{
      title:'启用',
      dataIndex: "isEnabled",
      width:50,
      render:(_,record,index)=><Checkbox onChange={e=>{
        const newDataSource = [...dataSource];
        const current = newDataSource.filter((_,index1)=>index1===index);
        if(current && current.length>0){
          current[0].isEnabled = e.target.checked;
          setDataSource(newDataSource);
        }
      }} checked={record.isEnabled} />
    },{
      title:'操作',
      dataIndex: "isEnabled",
      width:80,
      render:(_,record,index)=>[
        <Button key='remove' size='small' type='primary' danger onClick={()=>{
          if(record.id){
            // 调用接口去删除
          }
          setDataSource(dataSource.filter((_,index1)=>index!==index1))

        }}>移除</Button>
      ]
    }
  ];
  return (
    <>
      <ProTable
        cardProps={false}
        bordered
        size='small'
        search={false}
        options={false}
        pagination={false}
        rowKey="key"
        dataSource={dataSource}
        columns={columns}
      />
      <Button type='primary' style={{marginTop:24}} onClick={()=>{
        setDataSource([
          ...dataSource,
          {
            key:dataSource.length,
          }
        ])
      }}>新增</Button>
      <Button type='primary' style={{marginTop:24,marginLeft:24}} onClick={()=>{
        homeBottomBarSave({
          str: JSON.stringify(dataSource.map((item,index)=>({
            key: index,
            ...item,
          })))
        }).then(result=>{
          setDataSource(result.data)
        })
      }}>保存</Button>
    </>
  )
}

export default HomeBottomBar;
