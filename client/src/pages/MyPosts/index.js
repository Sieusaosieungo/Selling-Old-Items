import React, { useState, useEffect } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';

import './style.scss';

import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';

const prefixCls = 'my-posts';

const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link to={`/product-detail/${record._id}`}>{text}</Link>
    ),
  },
  {
    title: 'Giá',
    dataIndex: 'cost',
    key: 'cost',
    render: cost => `${numberToNumberWithCommas(cost)}đ`,
  },
  {
    title: 'Ảnh',
    dataIndex: 'mainImage',
    key: 'mainImage',
    render: mainImage => (
      <img
        src={`${config.API_IMAGES}/${mainImage}`}
        style={{ width: '10rem', height: '10rem' }}
      />
    ),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary" onClick={() => handleEdit(record._id)}>
          Sửa
        </Button>
        <Divider type="vertical" />
        <Button type="danger" onClick={() => handleDelete(record._id)}>
          Xóa
        </Button>
      </span>
    ),
  },
];

const handleEdit = productId => {
  console.log('Editing: ', productId);
};

const handleDelete = productId => {
  console.log('Deleted: ', productId);
};

const MyPosts = ({ cookies }) => {
  const [myPosts, setMyPosts] = useState([]);

  const { accessToken } = cookies.cookies;

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/users/my-products`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        if (res.data.results) {
          setMyPosts(res.data.results.products);
          console.log('my posts: ', res.data.results.products);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={`${prefixCls}`}>
      <Table dataSource={myPosts} columns={columns} size="small" />
    </div>
  );
};

export default withCookies(MyPosts);
