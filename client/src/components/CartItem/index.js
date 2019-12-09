/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { withCookies } from 'react-cookie';

import './style.scss';
import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';

const prefixCls = 'cart-item';

const CartItem = ({
  product_id,
  productPrice,
  mainImage,
  productName,
  quantity,
  cookies,
  setCart,
}) => {
  const { accessToken } = cookies.cookies;

  const handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `${config.API_URL}/carts/delete-product`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id,
      },
    })
      .then(res => {
        if (res.data.results) {
          setCart(res.data.results);
          message.success('Xóa sản phẩm thành công !');
          // console.log(res.data.results);
        }
      })
      .catch(err => message.error('Xóa không thành công !'));
  };

  return (
    <div className={`${prefixCls}`}>
      <img src={`${config.API_IMAGES}${mainImage}`} />
      <div className={`${prefixCls}-info`}>
        <Link to={`/product-detail/${product_id}`}>{productName}</Link>
        <span>{`${numberToNumberWithCommas(productPrice)}đ`}</span>
        <div className={`${prefixCls}-btn`}>
          <Button type="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withCookies(CartItem);
