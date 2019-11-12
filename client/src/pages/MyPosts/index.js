import React from 'react';
import { Table, Divider, Tag, Button } from 'antd';

import './style.scss';

const prefixCls = 'my-posts';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button>Invite {record.name}</Button>
        <Divider type="vertical" />
        <Button>Delete</Button>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Bàn học sinh',
    price: `${32000}đ`,
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Ghế học sinh',
    price: 42,
    description: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Giường đơn',
    price: 32,
    description: 'Sidney No. 1 Lake Park',
  },
];

const MyPosts = ({}) => {
  return (
    <div className={`${prefixCls}`}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default MyPosts;
