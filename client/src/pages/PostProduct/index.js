import React, { useState } from 'react';
import { Input, Form, Select, Button, Upload, Icon, message } from 'antd';

import './style.scss';

const { Option } = Select;
const { TextArea } = Input;

const prefixCls = 'post-product';

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

const PostProduct = ({ form: { getFieldDecorator }, form }) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className={`${prefixCls}`}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Tên sản phẩm:">
          {getFieldDecorator('ten-san-pham', {
            rules: [
              {
                required: true,
                message: 'Tên sản phẩm không được để trống',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Ảnh:">
          {getFieldDecorator('anh', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload
              name="avatar"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="Số lượng:">
          {getFieldDecorator('so-luong', {
            rules: [
              {
                required: true,
                message: 'Số lượng không được để trống !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Danh mục" hasFeedback>
          {getFieldDecorator('danh-muc', {
            rules: [{ required: true, message: 'Danh mục không được trống !' }],
          })(
            <Select placeholder="Chọn danh mục">
              <Option value="ban">Bàn</Option>
              <Option value="ghe">Ghế</Option>
              <Option value="tu-lanh">Tủ lạnh</Option>
              <Option value="giuong">Giường</Option>
              <Option value="ti-vi">Tv</Option>
              <Option value="dieu-hoa">Điều hòa</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Mô tả:">
          {getFieldDecorator('mo-ta', {
            rules: [
              {
                required: true,
                message: 'Mô tả không được để trống !',
              },
            ],
          })(<TextArea />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Tải lên
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'sign-up' })(PostProduct);
