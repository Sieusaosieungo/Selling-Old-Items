import React, { useState, useEffect } from 'react';
import { withPlatform } from '../../context/platform';
import { Tabs, message } from 'antd';
import axios from 'axios';

import './style.scss';
import CategoryCard from '../../components/CategoryCard';
import Category from '../../components/Category';

const { TabPane } = Tabs;

const prefixCls = 'home';

const renderCategory = () => {};

const Home = ({ platform }) => {
  const mode = platform.isMobile ? 'top' : 'left';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({})
      .then(res => {
        if (1) {
        }
      })
      .catch(err => console.log(err));
  }, [categories]);

  return (
    <div className={`${prefixCls}`}>
      <Tabs tabPosition={mode}>
        <TabPane tab={`Trang chủ`} key={'trang-chu'}>
          <CategoryCard categories={categories} />
        </TabPane>
        <TabPane tab={`Bàn`} key={'ban'}>
          <Category {...categories[0]} />
        </TabPane>
        <TabPane tab={`Quạt`} key={'quat'}>
          <Category {...categories[0]} />
        </TabPane>
        <TabPane tab={`Đèn`} key={'den'}>
          <Category {...categories[0]} />
        </TabPane>
        <TabPane tab={`Chuột`} key={'chuot'}>
          <Category {...categories[0]} />
        </TabPane>
        <TabPane tab={`Tủ quần áo`} key={'tu-quan-ao'}>
          <Category {...categories[0]} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default withPlatform(Home);
