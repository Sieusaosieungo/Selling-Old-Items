import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Select, message } from 'antd';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import config from '../../utils/config';

import './style.scss';

// fake data
import { levels } from '../../utils/level-data';

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

const Signup = ({ form: { getFieldDecorator }, form, history }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

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
            message.success('Đăng ký thành công !');
            history.push('/sign-in');
          })
          .catch(() => message.error('Lỗi đăng ký !'));
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
        <Form.Item label="Password" hasFeedback>
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
        <Form.Item label="Confirm Password" hasFeedback>
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
        <Form.Item label="Full Name">
          {getFieldDecorator('full_name', {
            rules: [
              {
                required: true,
                message: 'Please input your name !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Student code">
          {getFieldDecorator('student_id', {
            rules: [
              {
                required: true,
                message: 'Please input your student code !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Gender" hasFeedback>
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your sex !' }],
          })(
            <Select placeholder="Please select your sex">
              <Option value="female">Male</Option>
              <Option value="male">Female</Option>
            </Select>,
          )}
        </Form.Item>
        {/* <Form.Item label="Date Of Birth" hasFeedback>
          {getFieldDecorator('dateOfBirth', {
            rules: [
              { required: true, message: 'Please select your date of birth !' },
            ],
          })(<DatePicker />)}
        </Form.Item> */}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'sign-up' })(Signup);
