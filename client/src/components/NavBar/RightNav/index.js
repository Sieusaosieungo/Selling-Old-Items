import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown, Modal, Spin } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import './style.scss';

import config from '../../../utils/config';
import { storeUser, deleteUser, updateState } from '../../../actions';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';

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
        <Link to="/user/my-posts">Bài đăng của tôi</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="" onClick={logOut}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const RightMenu = ({ mode, user, accessTokenStore, dispatch, global }) => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const accessToken = accessTokenStore || cookies.accessToken;

  const logOut = () => {
    removeCookie('accessToken');
    window.location.reload();
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
            dispatch(storeUser(res.data.results.user));
          }
        })
        .catch(() => {
          logOut();
        });
    }
  }, [accessToken]);

  if (Object.keys(user).length > 0) {
    return (
      <Menu mode={mode} selectedKeys={[]}>
        <Menu.Item key="sign-out" className="avatar">
          <Avatar
            src={
              user.avatar
                ? `${config.API_IMAGES}${user.avatar}`
                : config.IMAGE_USER_DEFAULT
            }
          />
          <Dropdown overlay={() => Submenu(logOut)}>
            <Link className="ant-dropdown-link" to="/user/profile">
              {user.full_name} <Icon type="down" />
            </Link>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );
  } else if (!!accessToken) {
    return (
      <Menu mode={mode} selectedKeys={[]}>
        <Menu.Item key="loading">
          <Link to="#" className="loading">
            <Skeleton avatar active paragraph={{ rows: 0 }}></Skeleton>
          </Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={mode} selectedKeys={[]}>
        <Menu.Item key="sign-in">
          <Link
            to="#"
            onClick={() => dispatch(updateState({ isShowModalSignIn: true }))}
          >
            Đăng nhập
          </Link>
          <Modal
            visible={global.isShowModalSignIn}
            title="Đăng nhập"
            onOk={() => dispatch(updateState({ isShowModalSignIn: false }))}
            onCancel={() => dispatch(updateState({ isShowModalSignIn: false }))}
          >
            <SignIn />
          </Modal>
        </Menu.Item>
        <Menu.Item key="sign-up">
          <Link
            to="#"
            onClick={() => dispatch(updateState({ isShowModalSignUp: true }))}
          >
            Đăng kí
          </Link>
          <Modal
            visible={global.isShowModalSignUp}
            title="Đăng kí"
            onOk={() => dispatch(updateState({ isShowModalSignUp: false }))}
            onCancel={() => dispatch(updateState({ isShowModalSignUp: false }))}
          >
            <SignUp />
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
};

const mapStateToProps = ({ user, auth, global }) => {
  return {
    user,
    accessTokenStore: auth.accessToken,
    global,
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(RightMenu));
