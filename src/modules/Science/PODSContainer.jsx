import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import { saveAs } from 'file-saver';
import Plot from "react-plotly.js";
// import BackButton from "./BackButton";
import { getData } from "../Science/PODStateManager";

export default class PODSContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            pods: [
                { name: "POD 1", id: 0, sseName: "pod1", isActive: false, x1: [], y1: [], timeActivated: NaN },
                { name: "POD 2", id: 1, sseName: "pod2", isActive: false, x1: [], y1: [], timeActivated: NaN },
                { name: "POD 3", id: 2, sseName: "pod3", isActive: false, x1: [], y1: [], timeActivated: NaN },
                { name: "POD 4", id: 3, sseName: "pod4", isActive: false, x1: [], y1: [], timeActivated: NaN },
                { name: "POD 5", id: 4, sseName: "pod5", isActive: false, x1: [], y1: [], timeActivated: NaN },
                // { name: "POD 6", id: 5, sseName: "pod6", isActive: false, x1: [], y1: [], timeActivated: NaN },
                { name: "Sterilized POD", id: 5, sseName: "sterilizedPod", isActive: false, x1: [], y1: [], timeActivated: NaN },
            ],
            currentPOD: "POD 1",
            currentPODSSEName: "pod1",
            xrange: [-20, 1],
            seconds: 0
        };
        // this.layout = {
        //     width: 350,
        //     height: 250,
        //     showlegend: false,
        //     title: `${this.state.currentPOD} Geiger Graph`,
        //     xaxis: {
        //         title: "Time (s)",
        //         autotick: false,
        //         dtick: 2,
        //         range: this.state.xrange,
        //         showgrid: false,
        //         zeroline: false
        //     },
        //     yaxis: {
        //         title: "Something (S)",
        //         range: [-5, 5],
        //         showline: false,
        //         zeroline: false
        //     }
        // };
        this.range = [-5, 5];
        let currentPOD = this.state.currentPOD;
        let currentId = this.state.pods.find((pod) => pod.name === currentPOD).id;
        this.data = [
            {
                x: this.state.pods[currentId].x1,
                y: this.state.pods[currentId].y1,
                name: `${this.state.currentPOD} Graph`,
                type: "scatter"
            }
        ];
        // average background radiation: (Check assembly function)
            // average cpm before activation
        // Give a cpm value 10 minutes after activation (Check assembly function)
            // paramaterize those '10 minutes'
        // Calculate cpm growth per minute (Check assembly function)
            // finish / time
        // Get activation lines (Check state) + (handlePodClicked)
    }
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    };
    toggle = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };
    handleChange = (e) => {
        this.setState({ currentPOD: e.target.value, currentPODSSEName: e.target.name });
        // this.setState({x1: []});
        // this.setState({y1: []});
    };
    handlePODClicked = () => {
        const currentPOD = this.state.currentPOD;
        const currentId = this.state.pods.find((pod) => pod.name === currentPOD).id;
        const pods = this.state.pods;
        pods[currentId].isActive = true;
        pods[currentId].timeActivated = this.state.seconds;
        this.setState(() => ({ pods }));

        // console.log(pods[currentId].timeActivated);
        this.props.handlePodClick(currentId + 1);
    };
    handleDownload = () => {
        console.log('Creating file...');
        let csvFile = 'pod_no,timestamp,cpm,\n';
        for (let i = 0; i < this.state.pods.length; i++) {
            for (let j = 0; j < this.state.pods[i].x1.length; j += 10 ) {
                csvFile += `${this.state.pods[i].sseName},`;
                csvFile += this.state.pods[i].x1[j] + ',';
                csvFile += this.state.pods[i].y1[j] + ',';
                csvFile += '\n';
            }
        }
        let propertiesFile = this.assemblePropertiesFile();
        console.log(propertiesFile);

        let blobCSV   = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        let blobProps = new Blob([propertiesFile], { type: 'text/plain;charset=utf-8;' });

        saveAs(blobCSV, "science_data.csv");
        saveAs(blobProps, "properties.txt");
        
        console.log('Creation complete!');
    };
    // average background radiation: (Check assembly function)
        // average cpm before activation
    // Give a cpm value 10 minutes after activation (Check assembly function)
        // paramaterize those '10 minutes'
    // Calculate cpm growth per minute (Check assembly function)
        // finish / time
    // Get activation lines (Check state) + (handlePodClicked)
    assemblePropertiesFile = () => {
        let propertiesFile = '';

        // File activation time for each pod
        this.state.pods.forEach((pod) => {
            if (!isNaN(pod.timeActivated))
                propertiesFile += `${pod.sseName}_activation=${pod.timeActivated}\n`;
            else 
                propertiesFile += `${pod.sseName}_activation=null\n`;
        });

        // File cpm value after 10 minutes for each pod
        this.state.pods.forEach((pod) => {
            if (this.state.seconds >= 600)
                propertiesFile += `${pod.sseName}_10_minutes=${pod.y1[600]}\n`;
            else 
                propertiesFile += `${pod.sseName}_10_minutes=${pod.y1[pod.x1.length-1]}\n`;
        });

        // File average background radiation for each pod
        this.state.pods.forEach((pod) => {
            if (!isNaN(pod.timeActivated)) {
                let sum = 0;
                for (let i = 0; i < pod.timeActivated; i++) {
                    sum += pod.y1[i];
                }
                propertiesFile += `${pod.sseName}_background=${pod.timeActivated > 0 ? sum/pod.timeActivated : 0}\n`;
            } else {
                propertiesFile += `${pod.sseName}_background=null\n`;
            }
        });

        // Files cpm growth per minute for each pod
        this.state.pods.forEach((pod) => {
            if (this.state.seconds !== 0) {
                let growth = pod.y1[pod.y1.length-1] / pod.x1[pod.x1.length-1];
                propertiesFile += `${pod.sseName}_growth=${growth}\n`
            } else {
                propertiesFile += `${pod.sseName}_growth=null\n`;
            }
        });
          
        return propertiesFile;
    };
    findPODIndex = () => {
        return this.state.pods.find((pod) => pod.name === this.state.currentPOD).id;
    };
    renderGraph = () => {
        let layout = {
            width: 350,
            height: 250,
            showlegend: false,
            title: `${this.state.currentPOD} Geiger Graph`,
            xaxis: {
                title: "Time (s)",
                autotick: false,
                dtick: 2,
                range: this.state.xrange,
                showgrid: false,
                zeroline: false
            },
            yaxis: {
                title: "Voltage (cpm)",
                range: this.range,
                showline: false,
                zeroline: false
            }
        };
        return <Plot data={this.data} layout={layout} />;
        // return <p>react plotly is a huge file!</p>;
    };
    tick() {
        let currObj = getData();
        console.log(currObj);

        let currentPOD = this.state.currentPOD;
        let currentId = this.state.pods.find((pod) => pod.name === currentPOD).id;
        let pods = this.state.pods;

        // Set same x-values for all pods
        pods.map((pod) => {
            pod.x1 = [...pod.x1, this.state.seconds];
            return pod;
        });
        
        this.setState({ pods });

        // If data is received, attach data to appropriate pod's y-values
        if (currObj !== null) {
            pods.map((pod) => {
                pod.y1 = [...pod.y1, currObj[pod.sseName]];
                return pod;
            });
        } 
        // If data is not received, attach '0' to every pod's y-values
        else {
            pods.map((pod) => {
                pod.y1 = [...pod.y1, Math.floor(Math.random() * 10)];
                return pod;
            });
        }

        this.setState({ pods });

        setTimeout(() => { }, 1000);

        this.range = [Math.min(...this.state.pods[currentId].y1) - 5, Math.max(...this.state.pods[currentId].y1) + 5];

        let lowerXRange = this.state.xrange[0] + 1;
        let upperXRange = this.state.xrange[1] + 1;
        this.data = [
            {
                x: pods[currentId].x1,
                y: pods[currentId].y1,
                name: `${this.state.currentPOD} Graph`,
                type: "scatter"
            }
        ];
        this.setState({ xrange: [lowerXRange, upperXRange] });
        this.setState({ seconds: this.state.seconds + 1 });
    }
    render() {
        return (
            <div className="science-pods-container">
                <div className="science-pods-header">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Current POD: {this.state.currentPOD}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.pods.map((pod) =>
                                <DropdownItem
                                    onClick={this.handleChange}
                                    value={pod.name}
                                    name={pod.sseName}
                                    key={pod.id}
                                >
                                    {pod.name}
                                </DropdownItem>)
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <div
                        className="science-topbuttons-container"
                    >
                        <button
                            className="btn btn-dark"
                            onClick={this.props.handleStopAllButton}
                        >
                            Kill All
                        </button>
                        <Button
                            color="primary"
                            onClick={this.handleDownload}
                        >
                            Download
                        </Button>
                        {/* <BackButton
                            handleBackButton={this.props.handleBackButton}
                        /> */}
                    </div>
                </div>

                <div className="science-pod-container">
                    <div
                        className="science-pod-buttons"
                    >
                        <Button
                            onClick={this.handlePODClicked.bind(this)}
                            id={this.findPODIndex()}
                            color={this.state.pods[this.findPODIndex()].isActive ? "danger" : "info"}
                        >
                            {this.state.pods[this.findPODIndex()].isActive ? "Kill " : "Activate "}
                            {this.state.currentPOD}
                        </Button>
                    </div>
                    <div
                        className="science-graph-container"
                    >
                        {this.renderGraph()}
                    </div>
                </div>
            </div>
        );
    }
}