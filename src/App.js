import React from "react";
import NavBar from "./components/navbar";
import ModuleContainer from "./components/modules/ModuleContainer";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ModuleContainer />
      </React.Fragment>
    );
  }
}

export default App;
