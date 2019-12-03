import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Select, message } from 'antd';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import config from '../../utils/config';
import { connect } from 'react-redux';

import './style.scss';
import { updateState } from '../../actions';

const { Option } = Select;

const prefixCls = 'sign-up';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = ({ form: { getFieldDecorator }, form, dispatch }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirm;

        axios({
          method: 'POST',
          url: `${config.API_URL}/users/signup`,
          data: values,
        })
          .then(res => {
            if (res.data.code === 409) {
              message.error('Email đã tồn tại !');
            } else {
              dispatch(updateState({ isShowModalSignIn: true }));
              dispatch(updateState({ isShowModalSignUp: false }));
              message.success('Đăng ký thành công !');
            }
          })
          .catch(() => message.error('Lỗi đăng kí !'));
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  return (
    <div className={`${prefixCls}`}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mật khẩu" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Họ tên">
          {getFieldDecorator('full_name', {
            rules: [
              {
                required: true,
                message: 'Please input your name !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mssv">
          {getFieldDecorator('student_id', {
            rules: [
              {
                required: true,
                message: 'Please input your student code !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Địa chỉ">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please input your address!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Sđt">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please input your phone number !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Giới tính" hasFeedback>
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your sex !' }],
          })(
            <Select placeholder="Please select your sex">
              <Option value="female">Nam</Option>
              <Option value="male">Nữ</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect()(Form.create({ name: 'sign-up' })(Signup));
