import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Drawer, Button } from "antd";
import { withPlatform } from "../../context/platform";

import SearchInput from "./SearchInput";
import RightNav from "./RightNav";

import "./styles.scss";

const Navbar = ({ platform }) => {
  const [visible, setVisible] = useState(false);

  const mode = platform.isMobile ? "vertical" : "horizontal";

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <Router>
      <nav className="menuBar">
        <div className="logo">
          <Link to="/">logo</Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <SearchInput />
          </div>
          <div className="rightMenu">
            <RightNav mode={mode} />
          </div>
          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <SearchInput />
            <RightNav mode={mode} />
          </Drawer>
        </div>
      </nav>
    </Router>
  );
};
export default withPlatform(Navbar);
