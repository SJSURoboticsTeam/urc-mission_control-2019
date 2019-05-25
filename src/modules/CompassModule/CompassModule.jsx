import React, { Component } from "react";
import sendXHR from "../../lib/sendXHR";
import "./CompassStyle.css";

class CompassModule extends Component {
  state = {
    radioButtons: [
      { location: "San Jose, California ", optionName: 0, toggled: false },
      { location: "Hanksville, Utah", optionName: 1, toggled: false },
    ],
    heading: 5,
    esp_ip: "localhost:5001",
    event_source: null
  };

  // handleChange = (e) => {
  //   this.setState({ heading: e.target.value });
  //   console.log(e.target.value);
  // }

  connect = () => {
    this.setState(
      //first parameter of setState is an obj with state values you'd like updated
      {
        event_source: new EventSource("http://localhost:5001/sse")
      },

      /* 
        this second parameter is the callback function you want to invoke after
        the state has been updated. If you instead just try to call the function
        after setState() without doing this, the state object may not be updated
        in time, causing for some wonkiness.
      */
      this.setupSSE.bind(this)
    );
  }

  handleXHR = (endpoint) => {
    sendXHR(this.state.esp_ip, endpoint, {}, (res, url) => {
      let res_obj = JSON.parse(res);
      console.log(res_obj.message);
    });
    this.connect();
  };

  // componentDidMount() {
  //   this.handleXHR("toggle_compass");
  // }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({ heading: e.target.value });
    }
  }

  handleOptionChange = (e) => {
    let buttons = this.state.radioButtons;
    let radio_id = Number(e.target.id);
    if(radio_id === 1){
        buttons[1].toggled = true;
        buttons[0].toggled = false;
        
    } else if(radio_id === 0) {
        buttons[0].toggled = true;
        buttons[1].toggled = false;
    }
    sendXHR(this.state.esp_ip, "set_angle_dec", {angle_dec: e.target.name}, (res, url) => {
      let res_obj = JSON.parse(res);
      console.log(res_obj.message);
    });
    this.setState({ radioButtons: buttons });
  };

  handleHeadingChange = (evt) => {
    let heading = JSON.parse(evt.data).heading;
    // console.log(heading);
    this.setState({ heading });
  };

  setupSSE = () => {
    //Copy event source, add event onOpen/Close, listeners, call setState()
    let event_source = Object.assign(this.state.event_source);
    event_source.onopen = () => {
      // console.log("Event Source Added!");
    };

    event_source.onerror = () => {
      event_source.close();
      event_source = null;
      // console.log("Event Source Closed.");
    };
    //ADD EVENT LISTENERS    
    event_source.addEventListener("getHeading", this.handleHeadingChange);


    this.setState({ event_source });
  }

  render() {
    // RADIO BUTTON
    return (
      <div className="compass-container">

        <div className="compass-flex-container">
          <div className="compass-button-container">
              <form>
                {/* MAP FUNCTION */}
                {this.state.radioButtons.map((radioButton) =>

                  <div className="radio" key={radioButton.optionName}>
                    <label>
                      <input
                        type="radio"
                        id={radioButton.optionName}
                        name={radioButton.location}
                        checked={radioButton.toggled}
                        onChange={this.handleOptionChange}
                        // onClick={this.handleOptionChange}
                      />
                      Angle of Declination: {radioButton.location}
                    </label>
                  </div>
                )}
              </form>
            <button
              onClick={() => this.handleXHR("toggle_compass")}
            >
              Toggle Compass
          </button>
          </div>

          {/* <h1 style={{ color: "blue" }}> thanksgiving</h1> */}

          <div className="compass-image-container">
            <img
              className="compass-gear"
              src={require("./compass-gear.png")}
              alt="Compass Background"
            />

            {/* use (`) accent to render new state */}
            <img
              style={{ transform: `rotate(${this.state.heading}deg)` }}
              className="compass-pointer"
              src={require("./compass-point.png")}
              alt="Compass Needle"
            />
          </div>

        </div>
      </div>
    );
  }
}

export default CompassModule;
