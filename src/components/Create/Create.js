import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../App.css'
import './Create.css'
import Input from "../UI/Input/Input";
import {createControl, validate, validateForm} from '../Form/formFramework'

class Create extends Component {

    constructor() {
        super();
        this.state = {
            isFormValid: false,
            formControls: {
                onHands: {
                    value: '',
                    type: 'radio',
                    label: 'On Hands',
                    errorMessage: 'Field is required!',
                    options: [
                        {value: 'true', label: 'True'},
                        {value: 'false', label: 'False'},
                    ],
                    validation: {
                        required: true,
                    },
                },
                title: {
                    value: '',
                    type: 'text',
                    label: 'Title',
                    errorMessage: 'Field is required!',
                    validation: {
                        required: true,
                    }
                },
                author: {
                    value: '',
                    type: 'text',
                    label: 'Author',
                    errorMessage: 'Field is required!',
                    validation: {
                        required: true,
                    }
                },
                description: {
                    value: '',
                    type: 'text',
                    label: 'Description',
                    errorMessage: 'Field is required!',
                    validation: ''
                },
                published_year: {
                    value: '',
                    type: 'number',
                    label: 'Published year',
                    errorMessage: 'Field is required!',
                    validation: ''
                },
                publisher: {
                    value: '',
                    type: 'text',
                    label: 'Publisher',
                    errorMessage: 'Field is required!',
                    validation: ''
                },
            }
        };

        Object.keys(this.state.formControls).map((controlName, index) => {
            this.state.formControls[controlName] = createControl(this.state.formControls[controlName], this.state.formControls[controlName].validation)
        })
        this.setState(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {onHands, title, author, description, published_year, publisher} = this.state.formControls;
        var sendData = {
            onHands: onHands.value,
            title: title.value,
            author: author.value,
            description: description.value,
            published_year: published_year.value,
            publisher: publisher.value
        };
        console.log('Send data: ', sendData);
        axios.post('/api/book', sendData)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            if (controlName === 'onHands') {
                return (
                    <div className="form-group">
                        <label className='col-4 mr-3'>On Hands</label>
                        <div className="form-check-inline">
                            <Input
                                name='onHands'
                                key={controlName + index}
                                type={control.type}
                                value={control.options[0].value}
                                valid={control.valid}
                                touched={control.touched}
                                label={control.options[0].label}
                                shouldValidate={!!control.validation}
                                errorMessage={control.errorMessage}
                                onChange={event => this.onChangeHandler(event, controlName)}
                            />
                        </div>
                        <div className="form-check-inline">
                            <Input
                                name='onHands'
                                key={controlName + index}
                                type={control.type}
                                value={control.options[1].value}
                                valid={control.valid}
                                touched={control.touched}
                                label={control.options[1].label}
                                shouldValidate={!!control.validation}
                                errorMessage={control.errorMessage}
                                onChange={event => this.onChangeHandler(event, controlName)}
                            />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="form-group">
                        <Input
                            key={controlName + index}
                            type={control.type}
                            value={control.value}
                            valid={control.valid}
                            touched={control.touched}
                            label={control.label}
                            shouldValidate={!!control.validation}
                            errorMessage={control.errorMessage}
                            onChange={event => this.onChangeHandler(event, controlName)}
                        />
                    </div>
                )
            }


        })
    }


    render() {
        return (
            <div className="content">
                <h3 className="header-content">
                    ADD BOOK
                </h3>
                <div className="panel-body">
                    <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link>
                    </h4>
                    <form onSubmit={this.onSubmit}>
                        {this.renderInputs()}

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="title">Title:</label>*/}
                        {/*    <input type="text" className="form-control" name="title" value={title}*/}
                        {/*           onChange={this.onChange} placeholder="Title"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="author">Author:</label>*/}
                        {/*    <input type="text" className="form-control" name="author" value={author}*/}
                        {/*           onChange={this.onChange} placeholder="Author"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="description">Description:</label>*/}
                        {/*    <textArea className="form-control" name="description" onChange={this.onChange}*/}
                        {/*              placeholder="Description" cols="80" value={description} rows="3"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="published_date">Published Date:</label>*/}
                        {/*    <input type="number" className="form-control" name="published_year" value={published_year}*/}
                        {/*           onChange={this.onChange} placeholder="Published Year"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="publisher">Publisher:</label>*/}
                        {/*    <input type="text" className="form-control" name="publisher" value={publisher}*/}
                        {/*           onChange={this.onChange} placeholder="Publisher"/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="onHands">On Hands:</label>*/}
                        {/*    <div className="form-check-inline">*/}
                        {/*        <label className="form-check-label">*/}
                        {/*            <input type="radio" className="form-check-input" name="onHands" value='false'*/}
                        {/*                   onChange={this.onChange}/> False*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*    <div className="form-check-inline">*/}
                        {/*        <label className="form-check-label">*/}
                        {/*            <input type="radio" className="form-check-input" name="onHands" value='true'*/}
                        {/*                   onChange={this.onChange}/> True*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <button type="submit" className={!this.state.isFormValid ? 'disabled' : 'btn-submit'} disabled={!this.state.isFormValid}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create;
