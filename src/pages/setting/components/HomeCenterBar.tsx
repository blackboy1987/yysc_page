import type {ProColumns} from '@ant-design/pro-components';
import {DragSortTable} from '@ant-design/pro-components';
import {Button, Checkbox, Input, message} from 'antd';
import {useEffect, useState} from 'react';
import ImageUpload from "@/components/ImageUpload";
import {homeCenterBar, homeCenterBarSave} from '../service'

const HomeCenterBar = () =>{
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    homeCenterBar().then(result=>{
      setDataSource(result.data)
    })
  }, []);

  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 50,
      className: 'drag-visible',
    },{
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
      renderText:(_,record,index)=><Input.Search value={record.image} enterButton={<ImageUpload onSuccess={url=>{
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
  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    setDataSource(newDataSource);
    homeCenterBarSave({
      str: JSON.stringify(newDataSource.map((item,index)=>({
        key: index,
        ...item,
      })))
    }).then(result=>{
      setDataSource(result.data)
    })
    message.success('修改列表排序成功').then();
  };
  return (
    <>
      <DragSortTable
        cardProps={false}
        bordered
        size='small'
        search={false}
        options={false}
        pagination={false}
        rowKey="key"
        dragSortKey="sort"
        dataSource={dataSource}
        onDragSortEnd={handleDragSortEnd}
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
        homeCenterBarSave({
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

export default HomeCenterBar;
