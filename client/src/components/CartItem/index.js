/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './style.scss';

// fake data
import { categories } from '../../utils/data';

const prefixCls = 'cart-item';

const CartItem = ({}) => {
  const { image, name, price, id } = categories[0].productItems[0];
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity(quantity <= 1 ? 1 : quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  return (
    <div className={`${prefixCls}`}>
      <img src={image} />
      <div className={`${prefixCls}-info`}>
        <Link to={`/product-detail/${id}`}>{name}</Link>
        <span>{`${price}đ`}</span>
        <div className={`${prefixCls}-quantity`}>
          <Button onClick={handleDecrease}>-</Button>
          &nbsp;&nbsp;
          {quantity}
          &nbsp;&nbsp;
          <Button onClick={handleIncrease}>+</Button>
        </div>
        <Button type="danger">Xóa</Button>
      </div>
    </div>
  );
};

export default CartItem;
