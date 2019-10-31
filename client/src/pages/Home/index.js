import React, { useState } from "react";
import { withPlatform } from "../../context/platform";
import { Tabs } from "antd";

import "./style.scss";

// import SideBar from "../../components/SideBar";
const { TabPane } = Tabs;

const prefixCls = "home";

const Home = ({ platform }) => {
  const mode = platform.isMobile ? "top" : "left";

  return (
    <div className={`${prefixCls}`}>
      <Tabs tabPosition={mode}>
        <TabPane tab={`Table`} key={"1"}>
          Content of tab {"1"}
        </TabPane>
        <TabPane tab={`Chair`} key={"2"}>
          Content of tab {"2"}
        </TabPane>
        <TabPane tab={`Fan`} key={"3"}>
          Content of tab {"3"}
        </TabPane>
        <TabPane tab={`Led`} key={"4"}>
          Content of tab {"4"}
        </TabPane>
        <TabPane tab={`Mouse`} key={"5"}>
          Content of tab {"5"}
        </TabPane>
        <TabPane tab={`Wardrobe`} key={"6"}>
          Content of tab {"6"}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default withPlatform(Home);
