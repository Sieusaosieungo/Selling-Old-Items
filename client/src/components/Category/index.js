import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import ProductItem from '../ProductItem';

import config from '../../utils/config';
import { updateState } from '../../actions';

const prefixCls = 'category';

const renderProductItem = productItems => {
  let result = null;

  if (productItems && productItems.length > 0) {
    result = productItems.map((productItem, index) => (
      <ProductItem key={index} {...productItem} />
    ));
  }

  return result;
};

const Category = ({ idCategory, global, dispatch, tab }) => {
  const { timeToUpdateOld = 0, productItems } =
    global[`category-${idCategory}`] || {};

  useEffect(() => {
    if (Date.now() - timeToUpdateOld >= config.TIME_TO_UPDATE) {
      axios({
        method: 'GET',
        url: `${config.API_URL}/products`,
        params: {
          category_id: idCategory,
        },
      })
        .then(res => {
          if (res.data.results.products) {
            const productsCategory = {
              timeToUpdateOld: Date.now(),
              productItems: res.data.results.products,
            };

            dispatch(
              updateState({ [`category-${idCategory}`]: productsCategory }),
            );
          }
        })
        .catch(err => console.log(err));
    }
  }, [tab]);

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-body`}>
        {renderProductItem(productItems)}
      </div>
      <Pagination defaultCurrent={1} total={21} />
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
