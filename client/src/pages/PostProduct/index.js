import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { Input, Form, Select, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';

import './style.scss';

import config from '../../utils/config';

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

const PostProduct = ({
  form: { getFieldDecorator },
  form,
  cookies: { cookies },
  history,
}) => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState({});

  const { accessToken } = cookies;

  console.log('history: ', history);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('product before upload:', { ...values, ...images });

        const formData = new FormData();
        formData.set('name', values.name);
        formData.set('category_id', values.category_id);
        formData.set('cost', values.cost);
        formData.set('description', values.description);
        formData.append('productMainImage', images.productMainImage);
        formData.append('productAttachImages', images.productAttachImages);

        axios({
          method: 'POST',
          url: `${config.API_URL}/products/`,
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
          .then(res => {
            if (res.data.results) {
              console.log('product uploaded: ', res.data);
              message.success('Đăng sản phẩm thành công !');
              setImages({});
              history.push('/user/my-posts');
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const onChange = e => {
    const { name, files } = e.target;
    setImages({ ...images, [name]: files[0] });
  };

  useEffect(() => {
    axios({
      mehod: 'GET',
      url: `${config.API_URL}/categories/`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.data.results.categories) {
          setCategories(res.data.results.categories);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={`${prefixCls}`}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Tên sản phẩm:">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Tên sản phẩm không được để trống',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Ảnh chính:">
          <label className="upload-btn-wrapper">
            <input
              type="file"
              required
              onChange={onChange}
              name="productMainImage"
            />
            <span>Tải lên ảnh</span>
          </label>
        </Form.Item>
        <Form.Item label="Ảnh phụ:">
          <label className="upload-btn-wrapper">
            <input
              type="file"
              required
              onChange={onChange}
              name="productAttachImages"
            />
            <span>Tải lên file .zip</span>
          </label>
        </Form.Item>
        <Form.Item label="Giá:">
          {getFieldDecorator('cost', {
            rules: [
              {
                required: true,
                message: 'Giá không được để trống !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Danh mục" hasFeedback>
          {getFieldDecorator('category_id', {
            rules: [{ required: true, message: 'Danh mục không được trống !' }],
          })(
            <Select placeholder="Chọn danh mục">
              {categories.map(({ name, _id }, index) => (
                <Option key={index} value={_id}>
                  {name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Mô tả:">
          {getFieldDecorator('description', {
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

export default withCookies(Form.create({ name: 'sign-up' })(PostProduct));
