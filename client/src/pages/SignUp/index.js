import React, { useState } from "react";
import { Input, Form, Button } from "antd";

import "./style.scss";

const prefixCls = "sign-up";

const Signup = ({}) => {
  return (
    <div className={`${prefixCls}`}>
      <Form>
        <Form.Item label="E-mail:">
          <Input />
        </Form.Item>
        <Form.Item label="Password:">
          <Input />
        </Form.Item>
        <Form.Item label="Confirm Password: ">
          <Input />
        </Form.Item>
        <Form.Item label="Name:">
          <Input />
        </Form.Item>
        <Form.Item label="Sex:">
          <Input />
        </Form.Item>
        <Form.Item label="Level:">
          <Input />
        </Form.Item>
        <Form.Item label="Student code:">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
