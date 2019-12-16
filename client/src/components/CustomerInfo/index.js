import React from 'react';

import './style.scss';
import config from '../../utils/config';

const prefixcls = 'customer-info';

const CustomerInfo = ({
  email,
  full_name,
  gender,
  student_id,
  phone,
  address,
  avatar,
}) => {
  return (
    <div className={`${prefixcls}`}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        <img
          src={`${config.API_IMAGES}${avatar}`}
          style={{
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        />
      </div>
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
