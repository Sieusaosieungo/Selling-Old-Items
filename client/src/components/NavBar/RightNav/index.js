import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import { Menu, Avatar, Icon, Dropdown, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import config from '../../../utils/config';
import { storeUser, signIn, deleteUser, signOut } from '../../../actions';

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

const RightMenu = ({ mode, user, accessTokenStore, dispatch }) => {
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const accessToken = accessTokenStore || cookies.accessToken;

  // if (accessToken === accessTokenStore) {
  //   console.log('match accessTokenStore');
  // } else {
  //   console.log('match cookies.accessToken');
  // }

  // console.log('Right nav: ', accessToken);

  const logOut = () => {
    removeCookie('accessToken');
    dispatch(deleteUser());
    // dispatch(signOut());
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
            // console.log('user info after call axios: ', res.data.results.user);
            dispatch(storeUser(res.data.results.user));
            // dispatch(signIn(accessToken));
          }
        })
        .catch(() => {
          logOut();
        });

      // window.location.reload();
    }
  }, [accessToken]);

  return (
    <Menu mode={mode} selectedKeys={[]}>
      {Object.keys(user).length > 0 && (
        <Menu.Item key="sign-out" className="avatar">
          <Avatar
            src={
              user.images ||
              'https://cdn.eva.vn/upload/4-2019/images/2019-11-06/sinh-ra-trong-gia-dinh-viet-nhung-co-be-nay-lai-mang-ve-dep-tay-la-ky-untitled-19-1573053449-116-width600height750.jpg'
            }
          />
          <Dropdown overlay={() => Submenu(logOut)}>
            <Link className="ant-dropdown-link" to="/user/profile">
              {user.full_name} <Icon type="down" />
            </Link>
          </Dropdown>
        </Menu.Item>
      )}
      {!(Object.keys(user).length > 0) && (
        <Menu.Item key="sign-in">
          <Link
            to={location => ({
              ...location,
              pathname: '/account/sign-in',
              state: { prevPath: location.pathname },
            })}
          >
            Signin
          </Link>
        </Menu.Item>
      )}
      {!(Object.keys(user).length > 0) && (
        <Menu.Item key="sign-up">
          <Link to="/account/sign-up">Signup</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

const mapStateToProps = ({ user, auth }) => {
  return {
    user,
    accessTokenStore: auth.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(RightMenu));
