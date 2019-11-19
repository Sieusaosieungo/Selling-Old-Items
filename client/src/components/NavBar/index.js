import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { withPlatform } from '../../context/platform';

import SearchInput from './SearchInput';
import RightNav from './RightNav';

import './style.scss';

const Navbar = ({ platform }) => {
  const [visible, setVisible] = useState(false);

  const mode = platform.isMobile ? 'vertical' : 'horizontal';

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">Trang chủ</Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <SearchInput />
        </div>
        <div className="rightMenu">
          <RightNav mode={mode} />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <SearchInput />
          <RightNav mode={mode} />
        </Drawer>
      </div>
    </nav>
  );
};
export default withPlatform(Navbar);
