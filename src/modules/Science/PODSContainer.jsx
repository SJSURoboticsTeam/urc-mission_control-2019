import React from 'react';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';
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
        currentPOD: "POD 1"
    };
    toggle = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };
    handleChange = (e) => {
        this.setState({currentPOD: e.target.value});
    };
    handlePODClicked = (e) => {
        const currentId = e.target.id;
        console.log(`${this.state.currentPOD} clicked`);
        // this.setState((prevState) => ({pods[currentId].isActive: !prevState.pods[currentId].isActive}));
        this.setState((prevState) => ({pods: prevState.pods.map((pod) => pod.isActive = true), currentPOD: "POD 1"}));
        console.log(currentId);
    };
    findPODIndex = () => {
        return this.state.pods.find(pod => pod.name === this.state.currentPOD).id;
    };
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
                                key={pod.id}
                            >
                                {pod.name}
                            </DropdownItem>)
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <BackButton
                        handleBackButton={this.props.handleBackButton}
                    />
                </div>

                <div className="science-pod-container">
                    <button
                        onClick={this.handlePODClicked}
                        id={this.findPODIndex}
                        className="btn btn-info"
                    >
                        {this.state.currentPOD}
                        {this.state.pods[this.findPODIndex()].isActive ? "active" : "not-active"}
                    </button>
                </div>
            </div>
        );
    }
}