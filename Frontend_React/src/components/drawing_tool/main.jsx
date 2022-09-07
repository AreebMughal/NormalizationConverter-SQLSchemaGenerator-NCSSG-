import React, {Component} from "react";
import InputBox from "./inputBox";
import '../../assets/css/inputBox.css';
import DrawingTool from "./DrawingTool";
import FdList from "./fdList";
import my_data from "../../store/data";
import RelationName from "../relation_name/RelationName";



class Main extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        const inputBoxes = my_data.getRawState().inputBoxes
        const relationName = my_data.getRawState().relationName
        this.state = {
            relationName,
            inputBoxes,
            currentAttribute: ''
        }
        console.log('constructor')
        this.setRelation = this.setRelation.bind(this);
    }

    emptyState() {
        return {
            inputBoxes: [
                {
                    id: 1,
                    value: '',
                    width: 90,
                    dependency: [[]],
                    primary: false,
                    multiValue: false,
                }
            ],
            currentAttribute: '',
        }
    }

    // =============> InputBox Class Methods
    handleAdd = () => {
        const newElement = {
            id: this.state.inputBoxes[this.state.inputBoxes.length - 1].id + 1,
            value: '',
            width: 90,
            dependency: [[]],
            primary: false,
            multiValue: false,
        };
        const inputBoxes = [...this.state.inputBoxes, newElement]
        this.setState({
            inputBoxes
        });
    }

    handleRemove = () => {
        if (this.state.inputBoxes.length > 1) {
            let inputBoxes = [...this.state.inputBoxes]
            // inputBoxes = inputBoxes.filter(i => i.id !== inputBoxes.length)
            inputBoxes.splice(inputBoxes.length - 1, 1)
            this.setState({
                inputBoxes
            });
            this.focusAfterDeleteInputBox(inputBoxes)
        }
    }

    handleReset = () => {
        this.setState(this.emptyState())
        my_data.update(s => this.emptyState())
    }

    handleClick = (inputBox) => {
        this.updateAttributeName(inputBox);
        this.setPrimaryButtonClass(inputBox);
        this.setMultiValueButtonClass(inputBox)
        this.setState({
            currentAttribute: inputBox.id
        })
    }

    handleInputChange = (element) => {
        const id = this.getInputBoxIndex()
        const len = element.target.value.length;
        const inputBoxes = [...this.state.inputBoxes]
        inputBoxes[id] = {...inputBoxes[id]}
        let width = (len * 10) - (len * .2) + 2;
        if (width < 90)
            width = 90
        inputBoxes[id].width = width
        inputBoxes[id].value = element.target.value
        this.updateAttributeName(inputBoxes[id])
        this.setState({
            inputBoxes
        });
    };
    //------------------------------------------------------

    // =============> Drawing Tool Class Methods
    handlePrimary = () => {
        const index = this.getInputBoxIndex();
        // let input = document.getElementById((index + 1).toString())
        // if (index >= 0 && input.value !== undefined) {
        if (index >= 0) {
            const inputBoxes = [...this.state.inputBoxes];
            inputBoxes[index] = {...this.state.inputBoxes[index]};
            if (!inputBoxes[index].multiValue) {
                if (!inputBoxes[index].primary) {
                    inputBoxes[index].primary = true;
                } else {
                    inputBoxes[index].primary = false;
                }
                this.setState({
                    inputBoxes
                });
                this.setPrimaryButtonClass(inputBoxes[index]);
            }
        }
    }

    setPrimaryButtonClass(inputBox) {
        const element = document.getElementById('btn-primary');
        if (inputBox !== undefined && inputBox.primary) {
            // if (element.classList.contains('btn-outline-primary')) {
            element.classList.replace('btn-outline-primary', 'btn-primary')
        } else {
            element.classList.replace('btn-primary', 'btn-outline-primary')
        }
    }

    handleMultiValue = () => {
        const index = this.getInputBoxIndex();
        // let input = document.getElementById((index + 1).toString())
        // if (index >= 0 && input.value !== undefined) {
        if (index >= 0) {
            const inputBoxes = [...this.state.inputBoxes];
            inputBoxes[index] = {...this.state.inputBoxes[index]};
            if (!inputBoxes[index].primary) {
                if (!inputBoxes[index].multiValue) {
                    inputBoxes[index].multiValue = true;
                } else {
                    inputBoxes[index].multiValue = false;
                }
                this.setState({
                    inputBoxes
                });
                this.setMultiValueButtonClass(inputBoxes[index]);
            }
        }
    };

    setMultiValueButtonClass(inputBox) {
        const element = document.getElementById('btn-multi-value');
        if (inputBox !== undefined && inputBox.multiValue) {
            // if (element.classList.contains('btn-outline-primary')) {
            element.classList.replace('btn-outline-info', 'btn-info')
        } else {
            element.classList.replace('btn-info', 'btn-outline-info')
        }
    }

    handleDelete = () => {
        // let element = document.getElementsByClassName('attr')[0]
        if (this.state.inputBoxes.length > 1) {
            const index = this.getInputBoxIndex()
            let val = this.state.inputBoxes[index].value
            // console.log(val, index)
            let inputBoxes = [...this.state.inputBoxes]
            // inputBoxes = inputBoxes.filter(i => i.id !== this.getInputBoxIndex() + 1)
            inputBoxes.splice(index, 1)
            // console.log('del ', val)
            inputBoxes = [...inputBoxes]
            for (let i = 0; i < inputBoxes.length; i++) {
                inputBoxes[i] = {...inputBoxes[i]}
                inputBoxes[i].dependency = [...inputBoxes[i].dependency]
                inputBoxes[i].dependency = inputBoxes[i].dependency.map(dep => dep.filter(value => value !== val))
            }

            // console.log('input ', inputBoxes)
            this.setState({
                inputBoxes
            });
            this.updateAttributeName(false);
            this.setPrimaryButtonClass()
            this.focusAfterDeleteInputBox(inputBoxes)
        }
    };

    //------------------------------------------------------

    // =============> Multi-Select Class Methods
    handleChange_MultiValue = (id, elements) => {
        let values = elements.map(opt => {
            return opt.value;
        });
        // console.log(values[0])
        const index = this.getInputBoxIndex();
        if (index >= 0 && this.state.inputBoxes[index].value.toString().trim() !== '') {
            let inputBoxes = [...this.state.inputBoxes];
            inputBoxes[index] = {...this.state.inputBoxes[index]};
            inputBoxes[index].dependency = [...inputBoxes[index].dependency]
            inputBoxes[index].dependency[id] = values
            this.setState({
                inputBoxes
            });
            // console.log(this.state.inputBoxes)
        }
    };

    // =============> Drawing Tool Dependency Methods

    handleRemoveDep = (id) => {
        const index = this.getInputBoxIndex()
        let inputBoxes = [...this.state.inputBoxes];
        inputBoxes[index] = {...this.state.inputBoxes[index]};
        inputBoxes[index].dependency = [...inputBoxes[index].dependency]
        inputBoxes[index].dependency.splice(id, 1)
        this.setState({
            inputBoxes
        });
    }

    handleAddDep = () => {
        const index = this.getInputBoxIndex();
        const inputBoxes = [...this.state.inputBoxes];
        inputBoxes[index] = {...this.state.inputBoxes[index]};
        inputBoxes[index].dependency = [...inputBoxes[index].dependency]
        inputBoxes[index].dependency.push([])
        this.setState({
            inputBoxes
        });
    }

    getInputBoxIndex() {
        let index = 0
        const current = this.state.currentAttribute
        if (current !== '') {
            index = this.state.inputBoxes.map(object => object.id).indexOf(parseInt(current))
        }
        return index
    }

    handleUpdateData = () => {
        my_data.update(s => {
            s.inputBoxes = this.state.inputBoxes
            s.relationName = this.state.relationName
        })
        return ''
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleUpdateData()
        // console.log('After => ', my_data.getRawState().inputBoxes.length)
    }
    setRelation(value) {
        console.log(value)
        this.setState({
            relationName: value
        });
    }
    render() {
        console.log('main')
        return (
            <div className="main col-12">
                <div className="m row col-12">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="card ms-3 mt-3">
                            <div className='card-header'>
                                <span>Step-1: Create Relation</span>
                            </div>
                            <div className="card-body">
                                <RelationName
                                    setRelationName={this.setRelation}
                                    name={this.state.relationName}
                                />
                                {this.renderInputBoxes()}
                                {this.renderAddRemoveButtons()}
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-4 col-md-8 col-sm-12">
                        <DrawingTool
                            key={1}
                            inputBoxes={this.state.inputBoxes}
                            onPrimaryClick={this.handlePrimary}
                            onMultiValueClick={this.handleMultiValue}
                            onChangeMultiValue={this.handleChange_MultiValue}
                            onDeleteClick={this.handleDelete}
                            dependencyIndex={this.getInputBoxIndex()}
                            onClickRemoveDep={this.handleRemoveDep}
                            onClickAddDep={this.handleAddDep}
                        />
                    </div>
                </div>
                <hr className='ms-5 me-5'/>
                <div className="Fds-list ms-3">
                    <FdList
                        key={1}
                        inputBoxes={this.state.inputBoxes}
                    />
                </div>
            </div>
        )
    }

    renderInputBoxes() {
        return (
            <div className='d-flex flex-wrap'>
                {this.state.inputBoxes.map((inputBox, i) => {
                    if (inputBox.id !== undefined)
                        return <InputBox
                            key={i}
                            id={inputBox.id}
                            inputBox={inputBox}
                            onClick={this.handleClick}
                            onChange={this.handleInputChange}
                            width={inputBox.width}
                            onFocus={() => this.handleClick(inputBox)}
                        />
                    return ''
                })}
            </div>
        )
    }

    renderAddRemoveButtons() {
        return (
            <div className="buttons ms-2 mt-1">
                <button
                    className='btn btn-sm btn-primary text-white btn-style me-1'
                    onClick={this.handleAdd}
                >
                    ＋
                </button>
                <button
                    className='btn btn-sm btn-danger text-white btn-style'
                    onClick={this.handleRemove}
                >
                    -
                </button>
                <button
                    className='btn btn-sm btn-secondary ms-2'
                    onClick={this.handleReset}
                >
                    Reset
                </button>
            </div>
        );
    }

    updateAttributeName(inputBox) {
        let value = 'Attribute';
        if (typeof inputBox !== "boolean") {
            let element = document.getElementsByClassName('attr')[0];
            if (inputBox.value.length >= 1) {
                value = inputBox.value;
            }
            element.id = inputBox.id;
        }
        this.setAttrElementsValues(value)
    }

    setAttrElementsValues(value) {
        const elements = [...document.querySelectorAll('.attr')];
        elements.map(element => element.innerText = value);
    }

    focusAfterDeleteInputBox(inputBoxes) {
        // console.log(inputBoxes)
        document.getElementById(inputBoxes[0].id).focus()
    }

}

export default Main;