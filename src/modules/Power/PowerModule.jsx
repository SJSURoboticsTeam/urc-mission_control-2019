import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import PowerButtons from './PowerButtons';
import PowerGraph from './PowerGraph';

class PowerModule extends Component {
	state = {
		displayCompenent: 0,
		modules: [
			{ key: 0, name: 'Arm', id: 'arm', isChecked: false },
			{ key: 1, name: 'Wheel', id: 'wheel', isChecked: false },
			{ key: 2, name: 'Drive', id: 'drive', isChecked: false },
			{ key: 3, name: 'Mast Camera', id: 'camera', isChecked: false },
			{ key: 4, name: 'Control System', id: 'control-system', isChecked: false },
			{ key: 5, name: 'Intelligent System', id: 'intelligent-system', isChecked: false }
		]
	};

	/**
   * Goes to button module by changing states
   */
	handleChange = (value) => {
		this.setState({ displayCompenent: value });
	};

	/**
   * Conditional rendering
   */
	displanyComponent = () => {
		if (this.state.displayCompenent === 0) {
			return <PowerButtons modules={this.state.modules} />;
		} else if (this.state.displayCompenent === 1) {
			return <PowerGraph />;
		}
	};

	render() {
		return (
			<Fragment>
				{/* Button Menu */}
				<div id="power-menu">
					<Button className="menu-button" color="primary" onClick={() => this.handleChange(0)}>
						Button Module
					</Button>
					<Button className="menu-button" color="primary" onClick={() => this.handleChange(1)}>
						Graph Module
					</Button>
				</div>

				{/* Conditional rendering */}
				{this.displanyComponent()}
			</Fragment>
		);
	}
}

export default PowerModule;
