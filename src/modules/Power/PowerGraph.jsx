import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './PowerStyle.css';

class PowerGraph extends Component {
	state = {
		x1: [],
		y1: [],
		x2: [],
		y2: [],
		xrange: [ -20, 1 ],
		seconds: 0
	};

	/**
   * State of the graph is updated every second
   * xaxis is the time in seconds
   * yaxis is the random value of voltage between 21- 29
   */
	tick() {
		this.setState({ x1: [ ...this.state.x1, this.state.seconds ] });
		this.setState({ x2: [ ...this.state.x2, this.state.seconds ] });
		this.setState({ y1: [ ...this.state.y1, Math.floor(Math.random() * (29 - 21 + 1)) + 21 ] });
		this.setState({ y2: [ ...this.state.y2, Math.floor(Math.random() * (29 - 21 + 1)) + 21 ] });

		let lowerXRange = this.state.xrange[0] + 1;
		let upperXRange = this.state.xrange[1] + 1;

		this.setState({ xrange: [ lowerXRange, upperXRange ] });

		this.setState({ seconds: this.state.seconds + 1 });
	}

	/**
   * Invoked immediately after a component is mounted
   */
	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

	/**
   * Invoked immediately before a component is unmounted and destroyed
   */
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const data = [
			{
				x: this.state.x1,
				y: this.state.y1,
				name: 'Graph 1',
				type: 'scatter'
			},
			{
				x: this.state.x2,
				y: this.state.y2,
				name: 'Graph 2',
				type: 'scatter'
			}
		];

		const layout = {
			width: 570,
			height: 340,
			showlegend: false,
			title: 'Battery Voltage over Time',
			xaxis: {
				title: 'Time (s)',
				autotick: false,
				dtick: 2,
				range: this.state.xrange,
				showgrid: false,
				zeroline: false
			},
			yaxis: {
				title: 'Voltage (V)',
				range: [ 20, 29.4 ],
				showline: false,
				zeroline: false
			}
		};

		return (
			<div className="power-module">
				<Plot data={data} layout={layout} />
			</div>
		);
	}
}

export default PowerGraph;
