import React, { useState } from "react";

import "./style.scss";


const prefixCls = "side-bar";

const SideBar = ({ mode = "top" }) => {
  const [selectedNavbarItem, setSelectedNavbarItem] = useState("table");

  return <div className={`${prefixCls}`}></div>;
};

export default SideBar;
