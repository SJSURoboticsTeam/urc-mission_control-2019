import React, { Component } from "react";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import soundfile from "../../lib/css/sp.mp3";

class AppNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isPlaying: false,
    };
  }

  componentDidMount() {
    this.setState({
      darkThemeActive: this.props.darkThemeActive === "true",
    });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleAudio = () => {
    let audio = new Audio(soundfile);
    audio.play();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">Mission Control 2019</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Button outline 
                  color="primary"
                  onClick={() => this.props.toggleDarkTheme()}>
                  Dark Theme
                </Button>
                <NavItem>
                  <NavLink onClick={this.handleAudio}>
                    Github
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default AppNavbar;
