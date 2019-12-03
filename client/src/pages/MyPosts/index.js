import React, { useState, useEffect } from 'react';
import { Table, Divider, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { updateState } from '../../actions';
import { connect } from 'react-redux';

import './style.scss';

import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';
import CustomerInfo from '../../components/CustomerInfo';

const prefixCls = 'my-posts';

const MyPosts = ({ cookies, dispatch, global }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [customer, setCustomer] = useState({});

  const { accessToken } = cookies.cookies;

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
      render: cost => <span>{`${numberToNumberWithCommas(cost)}đ`}</span>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'mainImage',
      key: 'mainImage',
      render: mainImage => (
        <img
          src={`${config.API_IMAGES}${mainImage}`}
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
      title: 'Người mua',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (text, record) => (
        <Link to="#" onClick={() => showCustomerInfo(record.buyer.user_id)}>
          {(record.buyer && record.buyer.boughtName) || ''}
          <Modal
            title="Thông tin người mua sản phẩm"
            visible={global.isShowModalCustomerInfo}
            onOk={() =>
              dispatch(updateState({ isShowModalCustomerInfo: false }))
            }
            onCancel={() =>
              dispatch(updateState({ isShowModalCustomerInfo: false }))
            }
          >
            <CustomerInfo {...customer} />
          </Modal>
        </Link>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thao tác trạng thái',
      dataIndex: '',
      key: 'actstatus',
      render: (text, record) => (
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            style={{
              backgroundColor: '#28A745',
              color: '#fff',
              marginBottom: '.5rem',
            }}
            onClick={() => handleApprove(record._id)}
          >
            Xác nhận
          </Button>
          <Button type="danger" onClick={() => handleCancel(record._id)}>
            Hủy bỏ
          </Button>
        </span>
      ),
    },
    {
      title: 'Thao tác sản phẩm',
      dataIndex: '',
      key: 'actproduct',
      render: (text, record) => (
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            type="primary"
            onClick={() => handleEdit(record._id)}
            style={{
              color: '#fff',
              marginBottom: '.5rem',
            }}
          >
            Cập nhật
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record._id)}
            style={{
              color: '#fff',
              marginBottom: '.5rem',
            }}
          >
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  const showCustomerInfo = customerId => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/users/${customerId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        dispatch(updateState({ isShowModalCustomerInfo: true }));
        setCustomer(res.data.results.user);
      })
      .catch(err => console.log(err));
  };

  const handleApprove = productId => {
    axios({
      method: 'PATCH',
      url: `${config.API_URL}/products/approved`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id: productId,
      },
    })
      .then(res => {
        if (res.data.status === 1) {
          setMyPosts(res.data.results.products);
          message.success('Xác nhận bán thành công !');
        }
      })
      .catch(err => console.log(err));
  };

  const handleCancel = productId => {};

  const handleEdit = productId => {
    console.log('Editing: ', productId);
  };

  const handleDelete = productId => {
    console.log('Deleted: ', productId);
  };

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
          // console.log('my posts: ', res.data.results.products);
        }
      })
      .catch(err => console.log(err));
  }, []);

  console.log(myPosts);

  return (
    <div className={`${prefixCls}`}>
      <Table
        rowKey={record => record._id}
        bordered
        dataSource={myPosts}
        columns={columns}
        size="small"
      />
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(MyPosts));
