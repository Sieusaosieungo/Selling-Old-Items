import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Button, message } from 'antd';

import './style.scss';

import CartItem from '../../components/CartItem';
import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';
import Loading from '../../components/Loading';

const prefixCls = 'cart';

const renderCartItem = (listItems, setCart) => {
  let result = null;

  if (listItems && listItems.length > 0) {
    result = listItems.map((productItem, index) => {
      return <CartItem key={index} {...productItem} setCart={setCart} />;
    });
  }

  return result;
};

const Cart = ({}) => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');
  const [cart, setCart] = useState([]);

  const { accessToken } = cookies;

  const handleTempPayment = cart => {
    return cart.total_money;
  };

  const handleRealPayment = cart => {
    return cart.total_money;
  };

  const handlePayment = () => {
    axios({
      method: 'PATCH',
      url: `${config.API_URL}/carts/pay`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        message.success('Giao dịch thành công !');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/carts/`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        if (res.data.results.listItems) {
          setCart(res.data.results);
          // console.log('cart=', res.data.results);
        }
      })
      .catch(err => console.log(err));
  }, [JSON.stringify(cart)]);

  return (
    <div className={`${prefixCls}`}>
      <p>
        giỏ hàng
        <span>({cart.listItems ? cart.listItems.length : 0} sản phẩm)</span>
      </p>
      <div className={`${prefixCls}-content`}>
        {cart.listItems && renderCartItem(cart.listItems, setCart)}
        {!cart.listItems && (
          <div className={`${prefixCls}-empty`}>Giỏ hàng rỗng !</div>
        )}
      </div>
      <div className={`${prefixCls}-payment-side`}>
        <div className={`${prefixCls}-payment`}>
          <div className={`${prefixCls}-temp`}>
            <span>Tạm tính:</span>
            <span>{`${numberToNumberWithCommas(
              handleTempPayment(cart) || 0,
            )}đ`}</span>
          </div>
          <span></span>
          <div className={`${prefixCls}-real`}>
            <span>Thành tiền (Đã có giảm giá):</span>
            <span>{`${numberToNumberWithCommas(
              handleRealPayment(cart) || 0,
            )}đ`}</span>
          </div>
        </div>
        <div className={`${prefixCls}-btn`}>
          <Button
            type="danger"
            style={{ marginTop: '1.5rem', width: '80%' }}
            onClick={handlePayment}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
