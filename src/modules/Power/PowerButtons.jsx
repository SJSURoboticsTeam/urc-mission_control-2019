import React, { Component } from 'react';
import './PowerStyle.css';
import PowerConfirmation from './PowerConfirmation';
import { ButtonGroup, Button, } from 'reactstrap';

let switches;
let mainPower;
let modal;
class PowerButtons extends Component {
	state = {
		event_source: null,
		voltage: {
			armVoltage:         null,
			driveVoltage:       null,
			mastVoltage:        null,
			controlVoltage:     null,
			intelligentVoltage: null
		}
	};
	
	/**
   * Invoked immediately after a component is mounted
   */
	componentDidMount = () => {
		switches = document.getElementsByClassName('switch-button');
		mainPower = switches[0];
		modal = document.getElementById('myModal');
		this.switchEventListener();
		this.buttonState();
	};

	/**
   * Gets all the switch input fields then creates a change event 
   * listener and display result
   */
	switchEventListener = () => {
		// Change Event Listener
		for (let i = 1; i < switches.length; i++) {
			switches[i].addEventListener('change', function () {
				if (this.checked) {
					console.log(this.name + ' ON');
				} else {
					console.log(this.name + ' OFF');
				}
			});
		}
	};

	/**
   * Power Confirmation: Opens modal to confirm power off
   */
	powerConfirmation = () => {
		if (mainPower.checked === false) {
			modal.style.display = 'block';
			this.state.event_source.close();
		} else {
			console.log('POWER ON');
			this.connect();
		}
		mainPower.checked = true;
	};

	connect = () => {
		this.setState(
			{
				event_source: new EventSource("http://localhost:5004/sse")
			},

			this.setupSSE.bind(this)
		)
	};

	handleVoltageChange = (evt) => {
		let voltage = JSON.parse(evt.data);
		this.setState({ voltage });
	};

	setupSSE = () => {
		//Copy event source, add event onOpen/Close, listeners, call setState()
		let event_source = Object.assign(this.state.event_source);
		event_source.onopen = () => {
		  console.log("Event Source Added!");
		};
	
		event_source.onerror = () => {
		  event_source.close();
		  event_source = null;
		  console.log("Event Source Closed.");
		};
		//ADD EVENT LISTENERS    
		event_source.addEventListener("sendVoltage", this.handleVoltageChange);
	
	
		this.setState({ event_source });
	}

	buttonState = () => {
		for (let i = 0; i < this.props.modules.length; i++) {
			// console.log(switches[i + 1].name, this.props.modules[i].name);
			switches[i + 1].checked = this.props.modules[i].isChecked;
		}
	};

	changeButtonState = (key) => {
		let temp = Object.assign({}, this.props);
		if (mainPower.checked) {
			temp.modules[key].isChecked = !temp.modules[key].isChecked;
			this.setState({ modules: temp });
		}
	};

	decideButtonColor = (key) => {
		let temp = Object.assign({}, this.props);
		let isChecked = temp.modules[key].isChecked;
		return isChecked ? "primary" : "secondary";
	};
	
	getVoltage = (moduleName) => {
		const voltageObject = this.state.voltage;
		switch(moduleName) {
			case 'Arm':
				return voltageObject.armVoltage;
			case 'Drive':
				return voltageObject.driveVoltage;
			case 'Mast Camera':
				return voltageObject.mastVoltage;
			case 'Control System':
				return voltageObject.controlVoltage;
			case 'Intelligent System':
				return voltageObject.intelligentVoltage;
			default:
				return 0;
		}
	}

	render() {
		return (
			<div className="power-module">
				<h1>Power Module</h1>

				{/* Main Power Component Section */}
				<div className="component-form">
					<label>Main Power</label>
					<label className="switch">
						<input
							className="switch-button"
							type="checkbox"
							name="main power"
							onClick={this.powerConfirmation}
						/>
						<span className="slider round" />
					</label>
				</div>

				{/* Component Section */}
				<div className="power-buttons-container">
					<ButtonGroup vertical>
						{this.props.modules.map((module) => {
							return (
								// <div key={module.id} className="component-form">
								// 	<label>{module.name}</label>
								// 	<label className="switch">
								// 		<input
								// 			className="switch-button"
								// 			type="checkbox"
								// 			name={module.name}
								// 			onClick={() => this.changeButtonState(module.key)}
								// 		/>
								// 		{/* <span className="slider round" /> */}
								// 	</label>
								// </div>

								<Button
									className="switch-button"
									name={module.name}
									color={this.decideButtonColor(module.key)}
									onClick={() => this.changeButtonState(module.key)}
								>
									{module.name}
								</Button>

							);
						})}
					</ButtonGroup>
					<div className="power-buttons-data">
							{this.props.modules.map((module) => {
							return (
								<div className="power-button">
									<p

									>
										{module.name} = {this.getVoltage(module.name)} Volts
										

									</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Model Section */}
				<PowerConfirmation />
			</div>
		);
	}
}

export default PowerButtons;
