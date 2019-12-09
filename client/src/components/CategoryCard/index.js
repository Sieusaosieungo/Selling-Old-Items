import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import config from '../../utils/config';
import { updateState } from '../../actions';
import ProductItem from '../ProductItem';

const prefixCls = 'category-card';

const renderProductItem = productItems => {
  let result = null;

  if (productItems && productItems.length > 0) {
    result = productItems.map((productItem, index) => (
      <ProductItem key={index} {...productItem} />
    ));
  }

  return result;
};

const renderCategory = categoryHome => {
  let result = null;

  // console.log(categoryHome);

  if (categoryHome && categoryHome.length > 0) {
    result = categoryHome.map(({ titleCategory, to, productItems }, index) => (
      <Card key={index} title={<Link to={to}>{titleCategory}</Link>}>
        {renderProductItem(productItems)}
      </Card>
    ));
  }

  return result;
};

const CategoryCard = ({ global, dispatch }) => {
  const productsLatest = global['setProductsLatest'] || [];
  const productsRateHigh = global['productsRateHigh'] || [];

  // console.log(productsRateHigh);

  const { timeToUpdateOld } = global['categoryHome'] || {};

  const categoryHome = [
    {
      titleCategory: 'Sản phẩm mới nhất',
      to: '/san-pham-moi-nhat',
      productItems: productsLatest.products,
    },
    {
      titleCategory: 'Sản phẩm được đánh giá cao',
      to: '/san-pham-duoc-danh-gia-cao',
      productItems: productsRateHigh.products,
    },
  ];

  useEffect(() => {
    if (
      !timeToUpdateOld ||
      Date.now() - timeToUpdateOld >= config.TIME_TO_UPDATE
    ) {
      axios({
        method: 'GET',
        url: `${config.API_URL}/top/newest`,
        params: { number: 12 },
      })
        .then(res => {
          console.log(res.data);

          if (res.data.results.products) {
            const setProductsLatest = {
              products: res.data.results.products,
              timeToUpdateOld: Date.now(),
            };

            dispatch(
              updateState({
                setProductsLatest,
              }),
            );
          }
        })
        .catch(err => console.log(err));

      axios({
        method: 'GET',
        url: `${config.API_URL}/top/rate`,
        params: {
          number: 12,
        },
      })
        .then(res => {
          if (res.data.results.products) {
            const productsRateHigh = {
              products: res.data.results.products,
              timeToUpdateOld: Date.now(),
            };

            dispatch(
              updateState({
                productsRateHigh,
              }),
            );
          }
        })
        .catch(err => console.log(err));
    }
  }, []);

  return <div className={`${prefixCls}`}>{renderCategory(categoryHome)}</div>;
};

const mapStateToProps = ({ global }) => {
  return {
    global,
  };
};

export default connect(mapStateToProps)(CategoryCard);
