import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import "./style.scss";

import ProductItem from "../ProductItem";

const prefixCls = "category-card";

const renderProductItem = productItems => {
  let result = null;

  if (productItems.length > 0) {
    result = productItems.map((productItem, index) => (
      <ProductItem key={index} {...productItem} />
    ));
  }

  return result;
};

const renderCategory = categories => {
  let result = null;

  if (categories.length > 0) {
    result = categories.map(({ titleCategory, to, productItems }, index) => (
      <Card key={index} title={<Link to={to}>{titleCategory}</Link>}>
        {renderProductItem(productItems)}
      </Card>
    ));
  }

  return result;
};

const Category = ({ categories }) => {
  return <div className={`${prefixCls}`}>{renderCategory(categories)}</div>;
};

export default Category;
