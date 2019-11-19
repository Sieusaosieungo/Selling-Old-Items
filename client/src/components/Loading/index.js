import React, { useState } from 'react';
import { AtomSpinner } from 'react-epic-spinners';

import './style.scss';

const prefixCls = 'loading';

const Loading = ({}) => {
  return (
    <div className={`${prefixCls}`}>
      <AtomSpinner color="#1890FF" />
    </div>
  );
};

export default Loading;
