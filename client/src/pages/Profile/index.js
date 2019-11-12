import React from 'react';
import { Input, DatePicker, Button } from 'antd';

import './style.scss';

const prefixCls = 'profile';

const Profile = ({}) => {
  return (
    <div className={`${prefixCls}`}>
      <p>Thông tin tài khoản</p>
      <div className={`${prefixCls}-info`}>
        <div className={`${prefixCls}-name`}>
          <span>Họ tên:</span>
          <Input placeholder="Họ tên" />
        </div>
        <div className={`${prefixCls}-email`}>
          <span>Email:</span>
          <Input placeholder="Email" />
        </div>
        <div className={`${prefixCls}-date-of-birth`}>
          <span>Ngày sinh:</span>
          <DatePicker placeholder="yyyy-MM-dd" />
        </div>
        <div className={`${prefixCls}-student-id`}>
          <span>Mã sinh viên:</span>
          <Input disabled placeholder="20160000" />
        </div>
        <div className={`${prefixCls}-button`}>
          <Button type="primary">Cập nhật thông tin</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
