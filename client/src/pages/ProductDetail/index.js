import React, { useEffect, Fragment, useState } from 'react';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  message,
} from 'antd';

import './style.scss';

import config from '../../utils/config';
import Loading from '../../components/Loading';
import { numberToNumberWithCommas } from '../../utils/formatPrice';

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

const ProductDetail = ({
  match: {
    params: { id },
  },
}) => {
  const [stateComment, setStateComment] = useState({
    comments: [],
    submitting: false,
    value: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [productItem, setProductItem] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies('cookies');

  const { accessToken } = cookies;

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

  const handleAddToCart = () => {
    axios({
      method: 'POST',
      url: `${config.API_URL}/products/add-to-cart`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id: id,
      },
    })
      .then(res => {
        message.success(`Thêm sản phẩm vào giỏ hàng thành công !`);
        // message.info(
        //   `Click để đi đến giỏ hàng: ${(<Link to={'/user/cart'}>Click</Link>)}`,
        // );

        // console.log('product detail info =', res.data);
      })
      .catch(err => message.warning('Cần đăng nhập để thêm vào giỏ hàng !'));
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/products/${id}`,
    })
      .then(res => {
        if (res.data.results.product) {
          setProductItem(res.data.results.product);
          console.log(res.data.results.product);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  if (JSON.stringify({}) !== JSON.stringify(productItem)) {
    return (
      <Fragment>
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-image`}>
            <img
              src={`${config.API_IMAGES}${productItem.images[0]}`}
              alt={productItem.name}
            />
          </div>
          <div className={`${prefixCls}-info`}>
            <div className={`${prefixCls}-title`}>{productItem.name}</div>
            <div className={`${prefixCls}-price`}>{`${numberToNumberWithCommas(
              productItem.cost,
            )}đ`}</div>
            <div className={`${prefixCls}-rate`}>
              <Rate />
            </div>
            <div className={`${prefixCls}-description`}>
              <span>Mô tả:</span>
              <p>{productItem.description}</p>
            </div>
            <div className={`${prefixCls}-quantity`}>
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
  } else {
    return <Loading />;
  }
};

export default ProductDetail;
