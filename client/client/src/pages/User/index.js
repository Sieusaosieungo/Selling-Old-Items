import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

import './style.scss';

const Cart = Loadable({
  loader: () => import('../Cart'),
  loading: Loading,
});
const PostProduct = Loadable({
  loader: () => import('../PostProduct'),
  loading: Loading,
});
const Profile = Loadable({
  loader: () => import('../Profile'),
  loading: Loading,
});
const MyPosts = Loadable({
  loader: () => import('../MyPosts'),
  loading: Loading,
});

const prefixCls = 'user';

const User = ({
  match: {
    params: { tab },
  },
  history,
}) => {
  const [selected, setSelected] = useState(tab);

  useEffect(() => {
    setSelected(tab);
  }, [tab]);

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-left-menu`}>
        <Link
          to="/user/profile"
          className={selected === 'profile' ? 'active' : ''}
        >
          Trang cá nhân
        </Link>
        <Link
          to="/user/my-posts"
          className={selected === 'my-posts' ? 'active' : ''}
        >
          Bài đăng của tôi
        </Link>
        <Link to="/user/cart" className={selected === 'cart' ? 'active' : ''}>
          Giỏ hàng của tôi
        </Link>
        <Link
          to="/user/post-product"
          className={selected === 'post-product' ? 'active' : ''}
        >
          Đăng bài
        </Link>
      </div>
      <div className={`${prefixCls}-right-content`}>
        {selected === 'profile' && <Profile />}
        {selected === 'my-posts' && <MyPosts />}
        {selected === 'cart' && <Cart />}
        {selected === 'post-product' && <PostProduct history={history} />}
      </div>
    </div>
  );
};

export default User;
