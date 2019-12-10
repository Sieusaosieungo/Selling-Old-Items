import React, { useEffect, Fragment, useState } from 'react';
import { withCookies } from 'react-cookie';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
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
import { updateState } from '../../actions';

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
        Bình luận
      </Button>
    </Form.Item>
  </div>
);

const renderListImage = imageToShows => {
  let result = null;

  if (imageToShows && imageToShows.length > 0) {
    result = imageToShows.map((imageToShow, index) => (
      <div key={index}>
        <img src={`${config.API_IMAGES}${imageToShow}`} alt="Attach image" />
      </div>
    ));
  }

  return result;
};

const ProductDetail = ({
  match: {
    params: { id },
  },
  cookies,
  user,
  dispatch,
}) => {
  const [stateComment, setStateComment] = useState({
    submitting: false,
    value: '',
  });
  const [productItem, setProductItem] = useState({});

  console.log(productItem);

  const { accessToken } = cookies.cookies;

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
      });
    }, 500);

    axios({
      method: 'PATCH',
      url: `${config.API_URL}/products/add-comment`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        product_id: id,
        content: stateComment.value,
        datetime: new Date(),
      },
    })
      .then(res => {
        setProductItem(res.data.results.product);
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setStateComment({
      ...stateComment,
      value: e.target.value,
    });
  };

  const handleRate = value => {
    if (user && Object.keys(user).length > 0) {
      axios({
        method: 'PATCH',
        url: `${config.API_URL}/products/rating`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: {
          product_id: id,
          point: value,
        },
      })
        .then(res => {
          setProductItem(res.data.results.product);
        })
        .catch(err => console.log(err));
    } else {
      dispatch(updateState({ isShowModalSignIn: true }));
    }
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
      })
      .catch(err => {
        if (accessToken) {
          message.warning('Sản phẩm đã có trong giỏ hàng !');
        } else {
          message.warning('Cần đăng nhập để thêm vào giỏ hàng !');
        }
      });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${config.API_URL}/products/${id}`,
    })
      .then(res => {
        if (res.data.results.product) {
          setProductItem(res.data.results.product);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  if (JSON.stringify({}) !== JSON.stringify(productItem)) {
    return (
      <Fragment>
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-image`}>
            <Carousel infiniteLoop autoPlay transitionTime>
              {renderListImage([
                ...productItem.attachImages,
                productItem.mainImage,
              ])}
            </Carousel>
          </div>
          <div className={`${prefixCls}-info`}>
            <div className={`${prefixCls}-title`}>{productItem.name}</div>
            <div className={`${prefixCls}-price`}>{`${numberToNumberWithCommas(
              productItem.cost,
            )}đ`}</div>
            <div className={`${prefixCls}-rate`}>
              <Rate
                onChange={handleRate}
                allowHalf
                value={productItem.averagePoint}
              />
            </div>
            <div className={`${prefixCls}-description`}>
              <span>Mô tả:</span>
              <p>{productItem.description}</p>
            </div>
            <div className={`${prefixCls}-quantity`}>
              <Button onClick={handleAddToCart} type="primary">
                Thêm vào giỏ
              </Button>
            </div>
          </div>
          <div className={`${prefixCls}-comment`}>
            {productItem.comments.length > 0 ? (
              <CommentList
                comments={productItem.comments.map(comment => ({
                  ...comment,
                  avatar:
                    `${config.API_IMAGES}${comment.avatar}` ||
                    config.IMAGE_USER_DEFAULT,
                  datetime: moment(new Date(comment.datetime)).fromNow(),
                }))}
              />
            ) : (
              <div
                style={{
                  margin: '2rem auto 3rem',
                  width: '80%',
                  borderTop: '1px solid rgb(202, 202, 202)',
                }}
              ></div>
            )}
            <Comment
              avatar={
                <Avatar
                  src={
                    `${config.API_IMAGES}${user.avatar}` ||
                    config.IMAGE_USER_DEFAULT
                  }
                  alt={user.full_name}
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

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(ProductDetail));
