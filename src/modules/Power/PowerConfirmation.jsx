import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import './PowerStyle.css';

let switches;
let mainPower;
let modal;
class PowerConfirmation extends Component {
	componentDidMount = () => {
		switches = document.getElementsByClassName('switch-button');
		mainPower = switches[0];
		modal = document.getElementById('myModal');
		this.modalComponent();
	};

	/**
 * Creates a modal for confirmation of the shutting down power
 */
	modalComponent = () => {
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		};
	};

	/**
   * Main power is checked when the user confirms turning off
   */
	handlePower = (isPowerOn) => {
		mainPower.checked = isPowerOn;
		this.closeModal();

		// Debugging code
		if (isPowerOn === true) {
			console.log('POWER STILL ON');
		} else {
			console.log('POWER OFF');
		}
	};

	/**
   * Closes the model
   */
	closeModal = () => {
		modal.style.display = 'none';
	};

	render() {
		return (
			<Fragment>
				{/* Model Section */}
				<div id="myModal" className="modal">
					<div className="power-modal-content">
						<span className="close" onClick={this.closeModal}>
							&times;
						</span>
						<h1>Are you sure you want to power off?</h1>
						<p>
							Click <b>[YES]</b> to power off, click <b>[NO]</b> to continue on.
						</p>
						<div>
							<Button className="menu-button" color="danger" onClick={() => this.handlePower(false)}>
								Yes
							</Button>
							<Button color="primary" onClick={() => this.handlePower(true)}>
								No
							</Button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default PowerConfirmation;
