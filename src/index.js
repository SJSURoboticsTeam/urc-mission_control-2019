import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./modules/Common/Navbar";
import GridInterface from "./modules/Common/GridInterface";

import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cssCookie = new Cookies();
  }

  componentDidMount() {
    this.handleDarkTheme();
  }

  getCookie = () => {
    let cookie = this.cssCookie.get("darkthemeactive");
    let val = typeof cookie !== "undefined" ? cookie : "false";
    return val === "true";
  }

  toggleDarkTheme = () => {
    let value = !this.getCookie() ? "true" : "false";
    let d = new Date();
    d.setDate(d.getDate() + 30);
    this.cssCookie.set("darkthemeactive", value, 
      { path: "/",  expires: d });
    window.location.reload();
  }

  handleDarkTheme = () => {
    if (this.getCookie()) {
      require("./lib/css/darktheme.css");
    }else{
      require("./lib/css/ModuleContainer.css");
    }
  }

  render() {
    return (
      <div>
        <NavBar
          toggleDarkTheme={this.toggleDarkTheme.bind(this)} />
        <GridInterface />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));