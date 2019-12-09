import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Rate } from 'antd';

import './style.scss';

import config from '../../utils/config';
import { numberToNumberWithCommas } from '../../utils/formatPrice';

const { Meta } = Card;

const prefixCls = 'category-item';

const ProductItem = ({ _id, name, mainImage, cost = 0, averagePoint }) => {
  return (
    <Link to={`/product-detail/${_id}`} className={`${prefixCls}`}>
      <Card
        className={`${prefixCls}-card`}
        hoverable
        cover={<img alt={name} src={`${config.API_IMAGES}${mainImage}`} />}
      >
        <Rate
          allowHalf
          value={averagePoint}
          style={{ fontSize: '15px' }}
          disabled
        />
        <Meta title={name} description={`${numberToNumberWithCommas(cost)}đ`} />
      </Card>
    </Link>
  );
};

export default ProductItem;
