import React, {useRef} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Input, message, Upload} from 'antd';
import {
  PageContainer, ProForm,
  ProFormSwitch,
  ProFormUploadDragger, ProFormCheckbox, ProFormInstance, ProFormText
} from "@ant-design/pro-components";
import {Button} from 'antd';
import Form from "antd/es/form/Form";


import {Tabs} from 'antd';

const {TabPane} = Tabs;

import DemoMix from './DemoMix'; // Adjust the path according to your file structure




const UploadPDFFile = () => {
// const UploadPDFFile: React.FC = () =>  {  不带左上角的标题 上面这个写法带标题 切换也是直接转换的i18

  // 注释 - 能运行但是提交按钮没效果
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };


  return (
    // 没有pagecontainer包裹 左上角的 “上传PDF文件” 标题好像不会被渲染【如果只有proform组件，标题没有出现了】
    // <PageContainer title={"sfds"}> title也可以让左上角显示标题，但是proform不行
    <PageContainer>

      {/*// 提交 和 重置按钮内置在proform里面*/}
      <ProForm
        onFinish={async (values) => {

          try {
            // 这里替换为您的后端API调用
            const response = await fetch('YOUR_BACKEND_ENDPOINT', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {

              // mock - example
              await waitTime(2000);
              console.log(values);
              message.success("提交成功");

              // 处理后端响应
              const responseData = await response.json();
              console.log(responseData);
              message.success("提交成功");
            } else {
              // 处理错误情况
              message.error("提交失败");
            }
          } catch (error) {
            // 网络或其他错误
            message.error("提交异常");
          }
        }
        }
      >

        {/* 如果name全部设置成一样，会导致全部按钮要么打开要么关闭*/}
        {/*<ProFormSwitch name="switch1" label="Keyword List"/>*/}
        {/*<ProFormSwitch name="switch2" label="Abstract"/>*/}
        {/*<ProFormSwitch name="switch3" label="Research Method"/>*/}
        {/*<ProFormSwitch name="switch4" label="Recommend Literature"/>*/}

        <ProFormCheckbox.Group
          name="checkbox-group"
          label={<strong>Please select what needs to be extracted:</strong>}
          // label={<span style={{ fontWeight: 'bold' }}>sdf</span>}
          options={[
            'Keyword List',
            'Abstract',
            'Research Method',
            'Recommend Literature']}
        />

        <ProFormSwitch name="switch5"
          // label="xxx"
          // label={<b>Extracted All Info</b>[If you need extract all info, pls just open this switch]}
                       label={<span><strong>Extracted All Info</strong>  [ If you need extract all info, pls just open this switch]</span>}
        />
        {/*// 写法报错label={<span><strong>Extracted All Info</strong> [ If you need extract all info, pls just open this switch]</span>}>*/}


        <ProFormUploadDragger name="drag-pic"
                              label={<b>Upload your Single PDF File:</b>}
                              title={"Click or drag file to this area to upload"}
                              description={"Only receive a single pdf file once.\n" +
                              "Please rest assured that your pdf and article information will not be stored in the cloud."}
        />



      {/*        <Tabs tabPosition="left">*/}
      {/*  <TabPane tab="标签 1" key="1">*/}
      {/*    内容 1*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tab="标签 2" key="2">*/}
      {/*    内容 2*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tab="标签 3" key="3">*/}

      {/*  </TabPane>*/}
      {/*  /!* ...更多标签页... *!/*/}
      {/*</Tabs>*/}


      </ProForm>




    </PageContainer>

  );
};

export default UploadPDFFile;
