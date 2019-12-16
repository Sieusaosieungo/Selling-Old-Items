import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const prefixCls = 'search-item';

const SearchItem = ({ name, _id }) => {
  return (
    <Link className={`${prefixCls}`} to={`/product-detail/${_id}`}>
      {name}
    </Link>
  );
};

export default SearchItem;
