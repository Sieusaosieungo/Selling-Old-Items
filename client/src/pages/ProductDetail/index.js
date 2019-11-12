import React, { useEffect, Fragment, useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Rate } from 'antd';
import moment from 'moment';

import './style.scss';

// fake data
import { categories } from '../../utils/data';

const { TextArea } = Input;

const prefixCls = 'product-detail';

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const ProductDetail = ({}) => {
  const [stateComment, setStateComment] = useState({
    comments: [],
    submitting: false,
    value: '',
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {});

  const { image, name, price, description } = categories[0].productItems[0];

  const handleSubmit = () => {
    if (!stateComment.value) {
      return;
    }

    setStateComment({
      ...stateComment,
      submitting: true,
    });

    setTimeout(() => {
      setStateComment({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{stateComment.value}</p>,
            datetime: moment().fromNow(),
          },
          ...stateComment.comments,
        ],
      });
    }, 1000);
  };

  const handleChange = e => {
    setStateComment({
      ...stateComment,
      value: e.target.value,
    });
  };

  const handleAddToCart = () => {};

  return (
    <Fragment>
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-image`}>
          <img src={image} alt={name} />
        </div>
        <div className={`${prefixCls}-info`}>
          <div className={`${prefixCls}-title`}>{name}</div>
          <div className={`${prefixCls}-price`}>{`${price}đ`}</div>
          <div className={`${prefixCls}-rate`}>
            <Rate />
          </div>
          <div className={`${prefixCls}-description`}>
            <span>Mô tả:</span>
            <p>{description}</p>
          </div>
          <div className={`${prefixCls}-quantity`}>
            <div className={`${prefixCls}-quantity-display`}>
              <Button className={`${prefixCls}-decrease`}>-</Button>
              &nbsp;&nbsp;
              {quantity}
              &nbsp;&nbsp;
              <Button className={`${prefixCls}-increase`}>+</Button>
            </div>
            <Button onClick={handleAddToCart} type="primary">
              Add to cart
            </Button>
          </div>
        </div>
        <div className={`${prefixCls}-comment`}>
          {stateComment.comments.length > 0 ? (
            <CommentList comments={stateComment.comments} />
          ) : (
            <div
              style={{
                margin: '7rem auto 3rem',
                width: '80%',
                borderTop: '1px solid rgb(202, 202, 202)',
              }}
            ></div>
          )}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={stateComment.submitting}
                value={stateComment.value}
              />
            }
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetail;
