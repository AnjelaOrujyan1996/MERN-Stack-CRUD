import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css'
import './Create.css'

class Create extends Component {

  constructor() {
    super();
    this.state = {
      onHands: '',
      title: '',
      author: '',
      description: '',
      published_year: '',
      publisher: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { onHands, title, author, description, published_year, publisher } = this.state;
    console.log(this.state, '------------------------');
    axios.post('/api/book', { onHands, title, author, description, published_year, publisher })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { onHands, title, author, description, published_year, publisher } = this.state;
    return (
      <div className="content">
            <h3 className="header-content">
              ADD BOOK
            </h3>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textArea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" value={description} rows="3" />
              </div>
              <div className="form-group">
                <label htmlFor="published_date">Published Date:</label>
                <input type="number" className="form-control" name="published_year" value={published_year} onChange={this.onChange} placeholder="Published Year" />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher:</label>
                <input type="text" className="form-control" name="publisher" value={publisher} onChange={this.onChange} placeholder="Publisher" />
              </div>
              <div className="form-group">
                <label htmlFor="onHands">On Hands:</label>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="onHands" value='false' onChange={this.onChange}/> False
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="onHands"  value='true' onChange={this.onChange}/> True
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Create;
