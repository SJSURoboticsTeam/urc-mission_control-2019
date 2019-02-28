import React, { Component } from "react";
import darkCSS from "./darktheme.css"

class DarkTheme extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <React.Fragment>
         <link rel="stylesheet" type="text/css" href={darkCSS} />
         {console.log(darkCSS)}
      </React.Fragment>
    );
  }

}

export default DarkTheme;
