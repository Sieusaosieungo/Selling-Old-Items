import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

const prefixCls = 'sign-in';

const SignIn = ({ form, form: { getFieldDecorator } }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <div className={`${prefixCls}`}>
      <Form onSubmit={handleSubmit} className={`${prefixCls}-form`}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to="" className={`${prefixCls}-form-forgot`}>
            Forgot password
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className={`${prefixCls}-form-button`}
          >
            Log in
          </Button>
          Or <Link to="/sign-up">Sign up now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'sign-in' })(SignIn);
