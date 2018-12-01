import React, { Component } from 'react';
import './PowerStyle.css';
import PowerConfirmation from './PowerConfirmation';

let switches;
let mainPower;
let modal;
class PowerButtons extends Component {
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
			switches[i].addEventListener('change', function() {
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
		} else {
			console.log('POWER ON');
		}
		mainPower.checked = true;
	};

	buttonState = () => {
		for (let i = 0; i < this.props.modules.length; i++) {
			// console.log(switches[i + 1].name, this.props.modules[i].name);
			switches[i + 1].checked = this.props.modules[i].isChecked;
		}
	};

	changeButtonState = (key) => {
		let temp = Object.assign({}, this.props);
		temp.modules[key].isChecked = !temp.modules[key].isChecked;
		this.setState({ modules: temp });
	};

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
				{this.props.modules.map((module) => {
					return (
						<div key={module.id} className="component-form">
							<label>{module.name}</label>
							<label className="switch">
								<input
									className="switch-button"
									type="checkbox"
									name={module.name}
									onClick={() => this.changeButtonState(module.key)}
								/>
								<span className="slider round" />
							</label>
						</div>
					);
				})}

				{/* Model Section */}
				<PowerConfirmation />
			</div>
		);
	}
}

export default PowerButtons;
