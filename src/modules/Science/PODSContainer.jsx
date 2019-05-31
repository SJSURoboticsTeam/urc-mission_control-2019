import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import Plot from "react-plotly.js";
import BackButton from "./BackButton";
import { getData } from "../Science/PODStateManager";

export default class PODSContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            pods: [
                { name: "POD 1", id: 0, sseName: "pod1", isActive: false, x1: [], y1: [] },
                { name: "POD 2", id: 1, sseName: "pod2", isActive: false, x1: [], y1: [] },
                { name: "POD 3", id: 2, sseName: "pod3", isActive: false, x1: [], y1: [] },
                { name: "POD 4", id: 3, sseName: "pod4", isActive: false, x1: [], y1: [] },
                { name: "POD 5", id: 4, sseName: "pod5", isActive: false, x1: [], y1: [] },
                { name: "POD 6", id: 5, sseName: "pod6", isActive: false, x1: [], y1: [] },
                { name: "Sterilized POD", id: 6, sseName: "sterilizedPod", isActive: false, x1: [], y1: [] },
            ],
            currentPOD: "POD 1",
            currentPODSSEName: "pod1",
            x1: [],
            y1: [],
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
        this.data = [
            {
                x: this.state.x1,
                y: this.state.y1,
                name: `${this.state.currentPOD} Graph`,
                type: "scatter"
            }
        ];
        // average background radiation:
            // average cpm before activation
        // Give a cpm value 10 minutes after activation
            // paramaterize those '10 minutes'
        // Calculate cpm growth per minute
            // finish / time
        
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
        this.setState({x1: []});
        this.setState({y1: []});
    };
    handlePODClicked = () => {
        const currentPOD = this.state.currentPOD;
        const currentId = this.state.pods.find((pod) => pod.name === currentPOD).id;
        const pods = this.state.pods;
        pods[currentId].isActive = true;
        this.setState(() => ({ pods }));
        this.props.handlePodClick(currentId + 1);
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
        // console.log(`Getting value from: ${this.state.currentPODSSEName}`);
        this.setState({ x1: [...this.state.x1, this.state.seconds] });
        if (currObj !== null) {
            this.setState({ y1: [...this.state.y1, currObj[this.state.currentPODSSEName]] });
        } else {
            this.setState({ y1: [...this.state.y1, 0] });
        }
        // console.log(currObj[this.state.currentPODSSEName]);

        setTimeout(() => { }, 1000);

        this.range = [Math.min(...this.state.y1) - 5, Math.max(...this.state.y1) + 5];

        let lowerXRange = this.state.xrange[0] + 1;
        let upperXRange = this.state.xrange[1] + 1;
        this.data = [
            {
                x: this.state.x1,
                y: this.state.y1,
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
                        <BackButton
                            handleBackButton={this.props.handleBackButton}
                        />
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