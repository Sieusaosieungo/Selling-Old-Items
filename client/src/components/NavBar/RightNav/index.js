/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import config from '../../../utils/config';
import { storeUser } from '../../../actions';

const Submenu = logOut => {
  return (
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
        <Link to="" onClick={logOut}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const RightMenu = ({ mode, user, storeUser, isAuth }) => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const { accessToken } = cookies;

  const logOut = () => {
    removeCookie('accessToken');
    removeCookie('isAuth');
  };

  useEffect(() => {
    if (accessToken && Object.keys(user).length === 0) {
      axios({
        method: 'GET',
        url: `${config.API_URL}/users/`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then(res => {
          if (res.data.results.user) {
            storeUser(res.data.results.user);
          }
        })
        .catch(() => message.error('Signin failed !'));
    }
  }, [isAuth, accessToken]);

  return (
    <Menu mode={mode} selectedKeys={[]}>
      {accessToken && (
        <Menu.Item key="sign-out" className="avatar">
          <Avatar src={'image'} />
          <Dropdown overlay={() => Submenu(logOut)}>
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

const mapStateToProps = ({ user, isAuth }) => {
  return {
    user,
    isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeUser: user => dispatch(storeUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(RightMenu));
