import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from 'antd';

import './styles.scss';

import SearchItem from '../../SearchItem';
import config from '../../../utils/config';

const prefixCls = 'search';

const { Search } = Input;

const renderItemSearched = productSearched => {
  let result = null;

  if (productSearched && productSearched.length > 0) {
    result = productSearched.map((product, index) => (
      <SearchItem key={index} {...product} />
    ));
  }

  return result;
};

const SearchInput = () => {
  const [productSearched, setProductSearched] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const refSearch = useRef(null);

  const handleFocus = () => {
    setIsSearching(true);
  };

  const handleChange = ({ target: { value, name } }) => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/products`,
      params: {
        [name]: value,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.results.products) {
          setProductSearched(res.data.results.products);
        } else {
          setProductSearched([]);
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <div className={`${prefixCls}`}>
      <Search
        placeholder="Nhập tên sản phẩm"
        onFocus={handleFocus}
        // onBlur={handleBlur}
        enterButton
        onChange={handleChange}
        name="product_name"
      />
      {isSearching && (
        <div className={`${prefixCls}-recommend`} ref={refSearch}>
          <p
            style={{
              padding: '.5rem 1rem',
              borderBottom: '1px solid rgb(217,217,217)',
              margin: '0',
            }}
          >
            Kết quả tìm kiếm ({productSearched.length} sản phẩm)
          </p>
          {renderItemSearched(productSearched)}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
