import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./modules/Common/Navbar";
import GridInterface from "./modules/Common/GridInterface";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <GridInterface />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));