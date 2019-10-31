import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <Link to="#">Signin</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="#">Signup</Link>
      </Menu.Item>
    </Menu>
  );
};
export default RightMenu;
