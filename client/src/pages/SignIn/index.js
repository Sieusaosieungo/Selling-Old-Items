import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import './style.scss';

import config from '../../utils/config';

const prefixCls = 'sign-in';

const SignIn = ({ form, form: { getFieldDecorator }, history }) => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');
  const { accessToken } = cookies;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'POST',
          url: `${config.API_URL}/users/signin`,
          data: values,
        })
          .then(res => {
            setCookie('accessToken', res.data.results.token);
            setCookie('isAuth', true);
            message.success('Đăng nhập thành công !');
            history.goBack();
          })
          .catch(() => message.error('Sai tài khoản hoặc mật khẩu !'));
      }
    });
  };

  if (!accessToken) {
    return (
      <div className={`${prefixCls}`}>
        <Form onSubmit={handleSubmit} className={`${prefixCls}-form`}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
  } else {
    return <Redirect to="/" />;
  }
};



export default Form.create({ name: 'sign-in' })(SignIn);
