import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import request from '../../request';
import qs from 'qs';
import { Store } from 'antd/lib/form/interface';
import { Callbacks } from 'rc-field-form/lib/interface';
import 'antd/dist/antd.css';
import './style.css';

const layout = {
  // labelCol: {
  //   span: 8,
  // },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 8,
    span: 16,
  },
};

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = (values: Store): void => {
    console.log('Success:', values);
    request
      .post(
        '/api/login',
        qs.stringify({
          password: values.password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        const data: boolean = res.data;
        if (data) {
          setIsLogin(true);
        } else {
          message.error('登录失败！');
        }
      });
  };

  const onFinishFailed: Callbacks['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return isLogin ? (
    <Redirect to="/" />
  ) : (
    <div className="login-page">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          // label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
