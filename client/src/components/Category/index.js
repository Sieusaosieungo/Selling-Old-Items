import React from "react";
import { Pagination } from "antd";

import "./style.scss";

import ProductItem from "../ProductItem";

const prefixCls = "category";

const renderProductItem = productItems => {
  let result = null;

  if (productItems.length > 0) {
    result = productItems.map((productItem, index) => (
      <ProductItem key={index} {...productItem} />
    ));
  }

  return result;
};

const Category = ({ productItems }) => {
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-body`}>
        {renderProductItem(productItems)}
      </div>
      <Pagination defaultCurrent={1} total={21} />
    </div>
  );
};

export default Category;
