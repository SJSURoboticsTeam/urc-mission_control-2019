import React, { Component } from 'react';
import {
	Button,
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row
} from 'reactstrap';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

class RoverModel extends Component{
	constructor() {
		super();

		this.state = {
			cube_x_pos: 1,
			cube_y_pos: 1,
			cube_z_pos: 1
		};
	}

  	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;

		//ADD SCENE
		this.scene = new THREE.Scene();

		//ADD CAMERA
		this.camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		);
		this.camera.position.z = 4;

		//ADD RENDERER
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor('#000000');
		this.renderer.setSize(width, height);
		this.mount.appendChild(this.renderer.domElement);

		//ADD TRACKBALL CONTROLS
		this.controls = new TrackballControls( this.camera, this.mount );

		//ADD CUBE
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: '#433F81'     });
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(new THREE.AxesHelper( 5 ));
		this.scene.add(this.cube);
		this.start();
	}
	  
	componentWillUnmount() {
    	this.stop();
    	this.mount.removeChild(this.renderer.domElement);
  	}

	start = () => {
		if (!this.frameId) {
      		this.frameId = requestAnimationFrame(this.animate);
    	}
  	}

	stop = () => {
	    cancelAnimationFrame(this.frameId);
  	}
	
	animate = () => {
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
		this.renderScene();
		this.frameId = window.requestAnimationFrame(this.animate);	
	}

	renderScene = () => {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
	
	updateCubeOrientation = () => {
		this.setState({
			cube_x_pos: document.getElementById("cube-x-input").value,
			cube_y_pos: document.getElementById("cube-y-input").value,
			cube_z_pos: document.getElementById("cube-z-input").value
		});
		
		this.cube.position.x = this.state.cube_x_pos;
		this.cube.position.y = this.state.cube_y_pos;
		this.cube.position.z = this.state.cube_z_pos;
		this.renderScene();
	}

	render(){
		return(
			<Container>
				<Row>
					<Col>
					<div
						style={{ width: '300px', height: '300px' }}
						ref={(mount) => { this.mount = mount }}
					/>
					</Col>
					<Col>
						<Row>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>X</InputGroupText>
								</InputGroupAddon>
								<Input id="cube-x-input" placeholder="Dolla dolla billz yo!" />
							</InputGroup>
						</Row>
						<Row>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>Y</InputGroupText>
								</InputGroupAddon>
								<Input id="cube-y-input" placeholder="Dolla dolla billz yo!" />
							</InputGroup>
						</Row>
						<Row>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>Z</InputGroupText>
								</InputGroupAddon>
								<Input id="cube-z-input" placeholder="Dolla dolla billz yo!" />
							</InputGroup>
						</Row>
						<Row>
							<Button onClick={this.updateCubeOrientation}>Update Cube Orientation</Button>
						</Row>
					</Col>
				</Row>
			</Container>
			
		)
	}
}

export default RoverModel