import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../App.css'
import './Edit.css'
import {createControl, validate} from "../Form/formFramework";
import Input from "../UI/Input/Input";

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            formControls: {
                _id: {
                    value: ''
                },
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
    }

    componentDidMount() {
        axios.get('/api/book/' + this.props.match.params.id)
            .then(res => {
                Object.keys(res.data).map((key, index) => {
                    if (this.state.formControls.hasOwnProperty(key)) {
                        this.state.formControls[key].value = res.data[key];
                    }
                })
                Object.keys(this.state.formControls).map((controlName, index) => {
                    this.state.formControls[controlName] = createControl(this.state.formControls[controlName], this.state.formControls[controlName].validation)
                })
                this.setState(this.state);
            });
    }

    //
    // onChange = (e) => {
    //   const state = this.state
    //   state[e.target.name] = e.target.value;
    //   this.setState(this.state);
    // }

    // onSubmit = (e) => {
    //   e.preventDefault();
    //
    //   const { onHands, title, author, description, published_year, publisher } = this.state.book;
    //
    //   axios.put('/api/book/'+this.props.match.params.id, { onHands, title, author, description, published_year, publisher })
    //     .then((result) => {
    //       this.props.history.push("/show/"+this.props.match.params.id)
    //     });
    // }

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
        axios.put('/api/book/' + this.props.match.params.id, sendData)
            .then((result) => {
                this.props.history.push("/show/" + this.props.match.params.id)
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
            if (controlName !== '_id' && controlName === 'onHands') {
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
            } else if(controlName !== '_id'){
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
                    EDIT BOOK
                </h3>
                <div className="panel-body">
                    <h4><Link to={`/show/${this.state.formControls._id.value}`}><span className="glyphicon glyphicon-eye-open"
                                                                        aria-hidden="true"></span> Book List</Link></h4>
                    <form onSubmit={this.onSubmit}>
                        {this.renderInputs()}
                        <button type="submit" className="btn-submit" className={!this.state.isFormValid ? 'disabled' : 'btn-submit'} disabled={!this.state.isFormValid}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Edit;
