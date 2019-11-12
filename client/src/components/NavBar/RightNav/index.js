/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown } from 'antd';

import './style.scss';

// fake data
import { categories } from '../../../utils/data';

const Submenu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/user/profile">Trang cá nhân</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/user/post-product">Đăng bài</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/user/cart">Giỏ hàng</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/user/my-post">Bài đăng của tôi</Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="">Đăng xuất</Link>
    </Menu.Item>
  </Menu>
);

const RightMenu = ({ mode, cookies }) => {
  const { accessToken } = cookies.cookies;
  const { image } = categories[0].productItems[2];

  return (
    <Menu mode={mode} selectedKeys={[]}>
      {accessToken && (
        <Menu.Item key="sign-out" className="avatar">
          <Avatar src={image} />
          <Dropdown overlay={Submenu}>
            <Link className="ant-dropdown-link" to="/user/profile">
              Huynh <Icon type="down" />
            </Link>
          </Dropdown>
        </Menu.Item>
      )}
      {!accessToken && (
        <Menu.Item key="sign-in">
          <Link to="/sign-in">Signin</Link>
        </Menu.Item>
      )}
      {!accessToken && (
        <Menu.Item key="sign-up">
          <Link to="/sign-up">Signup</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};
export default withCookies(RightMenu);
