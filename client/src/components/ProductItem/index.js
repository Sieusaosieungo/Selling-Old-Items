import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import './style.scss';

const { Meta } = Card;

const prefixCls = 'category-item';

const ProductItem = ({ id, name, image, price = 0 }) => {
  return (
    <Link to={`/product-detail/${id}`} className={`${prefixCls}`}>
      <Card
        className={`${prefixCls}-card`}
        hoverable
        cover={<img alt={name} src={image} />}
      >
        <Meta title={name} description={`${price}đ`} />
      </Card>
    </Link>
  );
};

export default ProductItem;
