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
  productImages,
  productName,
  quantity,
  cookies,
  setCart,
}) => {
  const [quantityCart, setQuantityCart] = useState(quantity || 1);

  const { accessToken } = cookies.cookies;

  const handleDecrease = () => {
    if (quantityCart <= 1) {
      return message.error('Tối thiểu 1 sản phẩm !');
    }

    axios({
      method: 'PATCH',
      url: `${config.API_URL}/carts/decrease-product`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id,
      },
    })
      .then(res => {
        if (res.data.results.quantity) {
          setQuantityCart(res.data.results.quantity);
        }
      })
      .catch(err => message.error('Giảm không thành công !'));
  };

  const handleIncrease = () => {
    axios({
      method: 'PATCH',
      url: `${config.API_URL}/carts/increase-product`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id,
      },
    })
      .then(res => {
        if (res.data.results.quantity) {
          setQuantityCart(res.data.results.quantity);
        }
      })
      .catch(err => message.error('Tăng không thành công !'));
  };

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
      <img src={`${config.API_IMAGES}${productImages[0]}`} />
      <div className={`${prefixCls}-info`}>
        <Link to={`/product-detail/${product_id}`}>{productName}</Link>
        <span>{`${numberToNumberWithCommas(productPrice)}đ`}</span>
        <div className={`${prefixCls}-quantity`}>
          <Button onClick={handleDecrease}>-</Button>
          &nbsp;&nbsp;
          {quantityCart}
          &nbsp;&nbsp;
          <Button onClick={handleIncrease}>+</Button>
        </div>
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
