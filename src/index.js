import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./modules/Common/Navbar";
import GridInterface from "./modules/Common/GridInterface";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    darkThemeActive: false,
    chosenCSS: null
  }

  toggleDarkTheme = () => {
    this.setState({
      darkThemeActive: !this.state.darkThemeActive
    }, this.handleDarkTheme());
  }

  handleDarkTheme = () => {
    if (this.state.darkThemeActive) {
      require("./lib/css/darktheme.css");
    }else{
      require("./lib/css/ModuleContainer.css");
    }
  }

  render() {
    return (
      <div style={this.state.chosenCSS}>
        <NavBar toggleDarkTheme={this.toggleDarkTheme} />
        <GridInterface />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));