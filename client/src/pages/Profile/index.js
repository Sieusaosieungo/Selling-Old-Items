import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Button, message, Select, Checkbox } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { withCookies } from 'react-cookie';

import './style.scss';

import config from '../../utils/config';
import { storeUser } from '../../actions';

const { Option } = Select;

const prefixCls = 'profile';

const Profile = ({ user, cookies, dispatch }) => {
  const [userInfo, setUserInfo] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  const { accessToken } = cookies.cookies;

  const onChange = e => {
    if (e.target) {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
    } else {
      setUserInfo({ ...userInfo, gender: e });
    }
  };

  const handleChangePassword = e => setChangePassword(e.target.checked);

  const cancelUpdate = () => {
    setChangePassword(false);
    setDisabled(true);
  };

  const updateUserInfo = () => {
    if (disabled) {
      setDisabled(false);
    }

    if (changePassword) {
      if (!userInfo.oldPassword) {
        return message.warning('Không được bỏ trống mật khẩu cũ !');
      }

      if (userInfo.oldPassword && !userInfo.newPassword) {
        return message.warning('Không được bỏ trống mật khẩu mới');
      }

      if (userInfo.newPassword && !userInfo.confirmNewPassword) {
        return message.warning('Không được bỏ trống xác nhận mật khẩu mới');
      }
    }

    if (JSON.stringify(userInfo) !== JSON.stringify(user)) {
      delete userInfo.email;
      delete userInfo.student_id;

      axios({
        method: 'PATCH',
        url: `${config.API_URL}/users`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: userInfo,
      })
        .then(res => {
          if (res.data.results.user) {
            dispatch(storeUser(res.data.results.user));
            setChangePassword(false);
            setDisabled(true);
            message.success('Đổi thông tin thành công !');
          }
        })
        .catch(err => message.error('Đổi thông tin không thành công !'));
    }
  };

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  // console.log(userInfo);

  return (
    <div className={`${prefixCls}`}>
      <p>Thông tin tài khoản</p>
      <div className={`${prefixCls}-info`}>
        <div className={`${prefixCls}-name`}>
          <span>Họ tên:</span>
          <Input
            value={userInfo.full_name}
            name="full_name"
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        <div className={`${prefixCls}-email`}>
          <span>Email:</span>
          <Input
            value={userInfo.email}
            name="email"
            onChange={onChange}
            disabled
          />
        </div>
        <div className={`${prefixCls}-gender`}>
          <span>Giới tính:</span>
          <Select
            name="gender"
            value={`${userInfo.gender}`}
            onChange={onChange}
            disabled={disabled}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </div>
        <div className={`${prefixCls}-student-id`}>
          <span>Mã sinh viên:</span>
          <Input value={userInfo.student_id} onChange={onChange} disabled />
        </div>
        <div className={`${prefixCls}-phone`}>
          <span>Sđt:</span>
          <Input
            value={userInfo.phone}
            name="phone"
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        <div className={`${prefixCls}-address`}>
          <span>Địa chỉ:</span>
          <Input
            value={userInfo.address}
            name="address"
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        {!disabled && (
          <div className={`${prefixCls}-checkbox`}>
            <span>Đổi mật khẩu</span>
            <Checkbox onChange={handleChangePassword} />
          </div>
        )}
        {changePassword && (
          <div className={`${prefixCls}-old-password`}>
            <span>Mật khẩu cũ (*):</span>
            <Input type="password" onChange={onChange} name="oldPassword" />
          </div>
        )}
        {changePassword && (
          <div className={`${prefixCls}-new-password`}>
            <span>Mật khẩu mới:</span>
            <Input type="password" onChange={onChange} name="newPassword" />
          </div>
        )}
        {changePassword && (
          <div className={`${prefixCls}-confirm-new-password`}>
            <span>Xác nhận mật khẩu mới:</span>
            <Input
              type="password"
              onChange={onChange}
              name="confirmNewPassword"
            />
          </div>
        )}
        <div className={`${prefixCls}-button`}>
          <Button
            type="primary"
            onClick={updateUserInfo}
            className={`${prefixCls}-${!disabled ? 'btn-update' : 'btn'}`}
          >
            Cập nhật thông tin
          </Button>
          {!disabled && (
            <Button
              type="danger"
              className={`${prefixCls}-btn-cancel`}
              onClick={cancelUpdate}
            >
              Hủy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(withCookies(Profile));
