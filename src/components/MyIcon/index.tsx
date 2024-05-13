import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const MyIcon1 = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4520342_eynwwr3dkxd.js', // 在 iconfont.cn 上生成
});

type MyIconProps = {
  type: string;
}


const MyIcon:React.FC<MyIconProps> = ({type}) =>{
  return <MyIcon1 type="icon-tongguo" size={80} />
}

export default MyIcon;
