import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import './style.scss';

import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';

const { Meta } = Card;

const prefixCls = 'category-item';

const ProductItem = ({ _id, name, mainImage, cost = 0 }) => {
  return (
    <Link to={`/product-detail/${_id}`} className={`${prefixCls}`}>
      <Card
        className={`${prefixCls}-card`}
        hoverable
        cover={<img alt={name} src={`${config.API_IMAGES}${mainImage}`} />}
      >
        <Meta title={name} description={`${numberToNumberWithCommas(cost)}đ`} />
      </Card>
    </Link>
  );
};

export default ProductItem;
