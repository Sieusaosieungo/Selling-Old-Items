import React from 'react';

import './style.scss';

const prefixcls = 'customer-info';

const CustomerInfo = ({
  email,
  full_name,
  gender,
  student_id,
  phone,
  address,
}) => {
  return (
    <div className={`${prefixcls}`}>
      <div className={`${prefixcls}-raw`}>
        <label>Họ tên:</label>
        <span>{full_name}</span>
      </div>
      <div className={`${prefixcls}-raw`}>
        <label>Email:</label>
        <span>{email}</span>
      </div>
      <div className={`${prefixcls}-raw`}>
        <label>Giới tính:</label>
        <span>{gender}</span>
      </div>
      <div className={`${prefixcls}-raw`}>
        <label>Sđt:</label>
        <span>{phone}</span>
      </div>
      <div className={`${prefixcls}-raw`}>
        <label>Mssv:</label>
        <span>{student_id}</span>
      </div>
      <div className={`${prefixcls}-raw`}>
        <label>Địa chỉ:</label>
        <span>{address}</span>
      </div>
    </div>
  );
};

export default CustomerInfo;
