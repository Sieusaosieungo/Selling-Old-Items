import React, { useState, useEffect } from 'react';
import { withPlatform } from '../../context/platform';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import './style.scss';

import config from '../../utils/config';
import changeToSlug from '../../utils/changeToSlug';
import Loading from '../../components/Loading';

const CategoryCard = Loadable({
  loader: () => import('../../components/CategoryCard'),
  loading: Loading,
});
const Category = Loadable({
  loader: () => import('../../components/Category'),
  loading: Loading,
});

const { TabPane } = Tabs;

const prefixCls = 'home';

const renderCategory = (categories, tab) => {
  let result = null;

  if (categories && categories.length > 0) {
    result = categories.map(({ name, _id }, index) => (
      <TabPane
        key={changeToSlug(name)}
        tab={<Link to={`/category/${changeToSlug(name)}`}>{name}</Link>}
      >
        <Category idCategory={_id} tab={tab} />
      </TabPane>
    ));
  }

  return result;
};

const Home = ({
  platform,
  match: {
    params: { tab },
  },
}) => {
  const mode = platform.isMobile ? 'top' : 'left';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({
      mehod: 'GET',
      url: `${config.API_URL}/categories/`,
    })
      .then(res => {
        if (res.data.results.categories) {
          setCategories(res.data.results.categories);
          // console.log(res.data.results.categories);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={`${prefixCls}`}>
      <Tabs tabPosition={mode} activeKey={!tab ? 'trang-chu' : tab}>
        <TabPane
          key={'trang-chu'}
          tab={platform.isMobile ? <Link to={`/`}>Hot</Link> : ''}
        >
          <CategoryCard />
        </TabPane>
        {renderCategory(categories, tab)}
      </Tabs>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withCookies(withPlatform(Home)));
