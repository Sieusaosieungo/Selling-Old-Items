import React, { Fragment } from "react";

import "./styles.scss";

import NavBar from "../NavBar";
import Footer from "../Footer";

function App({ children }) {
  return (
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  );
}

export default App;
