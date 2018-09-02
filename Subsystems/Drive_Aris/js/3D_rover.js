import {
	RM_UP,
	RM_DOWN,
	RM_LEFT,
	RM_RIGHT
} from './model.js';

const DIV_HEIGHT = document.getElementById("3D-model").offsetHeight;
const DIV_WIDTH = document.getElementById("3D-model").offsetWidth;

class RoverModel {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: false });
		this.controls = new THREE.TrackballControls(this.camera, document.getElementById("3D-model"));
		this.rover_group = new THREE.Group();

		this.onWindowResize = this.onWindowResize.bind(this);
		this.animate = this.animate.bind(this);
		this.render = this.render.bind(this);
	}

	init() {
		this.configureScene();
		this.createSceneElements();

		//add scene to page
		let container = document.getElementById('3D-model');
		container.appendChild(this.renderer.domElement);

		//event listeners
		window.addEventListener('resize', this.onWindowResize, false);

		//begin rendering
		this.animate();
	}

	configureScene() {
		//controls
		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = false;
		this.controls.dynamicDampingFactor = 0.3;
		this.controls.keys = [65, 83, 68];
		this.controls.addEventListener('change', this.render);

		//renderer
		this.renderer.setPixelRatio(window.devicePixelRatio);
		//height of div is 0, so setting height of div to width to make a square box.
		this.renderer.setSize(DIV_WIDTH, DIV_WIDTH);

		//camera and controls
		this.camera.position.z = 50;	
	}

	createSceneElements() {
		//background
		this.scene.background = new THREE.Color(0xffffff);

		//lights
		let lights = []
		for (let i=0; i<3; i++) {
			lights[i] = new THREE.PointLight(0xffffff, 1, 0);
		}
		lights[0].position.set( 0, 200, 0 );
		lights[1].position.set( 100, 200, 100 );
		lights[2].position.set( - 100, - 200, - 100 );

		let lights_group = new THREE.Group();
		lights_group.add(lights[0], lights[1], lights[2]);

		//axes helper - may be deleted later.
		let axis = new THREE.AxesHelper(20);

		//rover
		let wheel_geometry = new THREE.CylinderGeometry(5, 5, 1, 20);
		let material = new THREE.MeshPhongMaterial({color: 0x156289});

		this.wheels = [];
		for (let i=0; i<4; i++) {
			this.wheels[i] = new THREE.Mesh(wheel_geometry, material);
			this.wheels[i].rotation.z = Math.PI/2;
		}
		this.wheels[0].position.set(-10, 0, -10);
		this.wheels[1].position.set(-10, 0, 10);
		this.wheels[2].position.set(10, 0, 10);
		this.wheels[3].position.set(10, 0, -10);
		

		let chasis_geometry = new THREE.BoxGeometry(20, 5, 20);
		this.chasis = new THREE.Mesh(chasis_geometry);
		this.chasis.position.y = 5;

		//add rover elements to group
		this.rover_group.add(this.wheels[0], this.wheels[1], this.wheels[2], this.wheels[3], this.chasis);

		//add everything to scene
		this.scene.add(axis);
		this.scene.add(this.rover_group);
		this.scene.add(lights_group);
	}

	onWindowResize() {
		this.camera.aspect = DIV_WIDTH / DIV_HEIGHT;
		this.camera.updateProjectionMatrix();

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.controls.handleResize();

		this.render();
	}

	animate() {
		requestAnimationFrame(this.animate);
		this.controls.update();
	}

	updateModel(magnitude, heading) {
		//convert heading to radians
		heading *= Math.PI/180;

		for (let i=0; i<4; i++) {
			this.wheels[i].rotation.x += (magnitude/100);
			this.wheels[i].rotation.y = heading + 90;
		}
		this.render();
	}

	rotateModel(direction) {
		switch(direction) {
			case RM_UP:
				this.camera.position.set(0, 50, 0);
				this.render()
				break;
			case RM_DOWN:
				this.camera.position.set(0, -50, 10);
				this.render()
				break;
			case RM_LEFT:
				this.camera.position.set(50, 0, 0);
				this.render()
				break;
			case RM_RIGHT:
				this.camera.position.set(-50, 0, 0);
				this.render()
				break;
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}
}

//export
let rover_model = new RoverModel();
export default rover_model;