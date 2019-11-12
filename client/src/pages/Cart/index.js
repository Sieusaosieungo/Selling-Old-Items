import React from 'react';

import './style.scss';

import CartItem from '../../components/CartItem';
import { Button } from 'antd';

const prefixCls = 'cart';

const Cart = ({}) => {
  const handleTempPayment = () => {
    return '27.000';
  };

  const handleRealPayment = () => {
    return '28.000';
  };

  return (
    <div className={`${prefixCls}`}>
      <p>
        giỏ hàng <span>(2 sản phẩm)</span>
      </p>
      <div className={`${prefixCls}-content`}>
        <CartItem />
        <CartItem />
      </div>
      <div className={`${prefixCls}-payment-side`}>
        <div className={`${prefixCls}-payment`}>
          <div className={`${prefixCls}-temp`}>
            <span>Tạm tính:</span>
            <span>{`${handleTempPayment()}đ`}</span>
          </div>
          <span></span>
          <div className={`${prefixCls}-real`}>
            <span>Thành tiền (Đã có giảm giá):</span>
            <span>{`${handleRealPayment()}đ`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
