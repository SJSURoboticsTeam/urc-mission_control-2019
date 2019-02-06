import React from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';
import Plot from 'react-plotly.js';
import BackButton from './BackButton';

export default class PODSContainer extends React.Component {
    state = {
        dropdownOpen: false,
        pods: [
            { name: "POD 1", id: 0, isActive: true },
            { name: "POD 2", id: 1, isActive: false },
            { name: "POD 3", id: 2, isActive: false },
            { name: "POD 4", id: 3, isActive: false },
            { name: "POD 5", id: 4, isActive: false },
            { name: "POD 6", id: 5, isActive: false },
            { name: "Sterilized POD", id: 6, isActive: false },
        ],
        currentPOD: "POD 1",
        x1: [],
        y1: [],
        xrange: [-20, 1],
        seconds: 0
    };
    toggle = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };
    handleChange = (e) => {
        this.setState({ currentPOD: e.target.value });
        this.interval = setInterval(() => this.tick(), 1000);
    };
    handlePODClicked = () => {
        const currentPOD = this.state.currentPOD;
        const currentId = this.state.pods.find((pod) => pod.name === currentPOD).id;
        const pods = this.state.pods;
        pods[currentId].isActive = true;
        console.log(`${currentPOD} clicked`);
        console.log(`${currentId} clicked`);
        this.setState(() => ({ pods }));
        this.props.handlePodClick(currentId + 1);
    };
    findPODIndex = () => {
        return this.state.pods.find(pod => pod.name === this.state.currentPOD).id;
    };
    tick() {
        this.setState({ x1: [...this.state.x1, this.state.seconds] });
        this.setState({ y1: [...this.state.y1, Math.floor(Math.random() * (29 - 21 + 1)) + 21] });

        let lowerXRange = this.state.xrange[0] + 1;
        let upperXRange = this.state.xrange[1] + 1;
        this.setState({ xrange: [lowerXRange, upperXRange] });
        this.setState({ seconds: this.state.seconds + 1 });
    }
    render() {

        const data = [
            {
                x: this.state.x1,
                y: this.state.y1,
                name: `${this.state.currentPOD} Graph`,
                type: 'scatter'
            }
        ];

        const layout = {
            width: 350,
            height: 250,
            showlegend: false,
            title: `${this.state.currentPOD} Geiger Graph`,
            xaxis: {
                title: 'Time (s)',
                autotick: false,
                dtick: 2,
                range: this.state.xrange,
                showgrid: false,
                zeroline: false
            },
            yaxis: {
                title: 'Something (S)',
                range: [20, 29.4],
                showline: false,
                zeroline: false
            }
        };

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
                        {/* <button
                            className="btn btn-danger"
                        >
                            Kill {this.state.currentPOD}
                        </button> */}
                    </div>
                    <div
                        className="science-graph-container"
                    >
                        <Plot data={data} layout={layout} />
                    </div>
                </div>
            </div>
        );
    }
}