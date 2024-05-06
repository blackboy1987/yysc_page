import React, {useEffect} from "react";

type MyEditorProps = {
  value?: string,
  onChange?: (value: string) => void,
}

const MyEditor: React.FC<MyEditorProps> = ({value,onChange}) =>{

  useEffect(()=>{
    if(window.UE){
      const ue = window.UE.getEditor('container',{

      });
      ue.ready(function(){
        ue.setContent(value || '');
      });
      ue.addListener('contentChange', () => {
        if(onChange){
          onChange(ue.getContent());
        }
      })
    }else{
      console.log("编辑器加载失败")
    }
    return () => {
      window.UE.getEditor('container').destroy()
    }
  },[])

  return (
    <div>
      <div style={{display:'flex'}} id='container'></div>
    </div>
  )
}

export default MyEditor;
