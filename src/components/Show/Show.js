import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css'
import './Show.css'

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      });
  }

  delete(id){
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="content">
            <h3 className="header-content">
              {this.state.book.title}
            </h3>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <dl>
              <dt>Author:</dt>
              <dd>{this.state.book.author}</dd>
              <dt>Description:</dt>
              <dd>{this.state.book.description}</dd>
              <dt>Publish Date:</dt>
              <dd>{this.state.book.published_year}</dd>
              <dt>Publisher:</dt>
              <dd>{this.state.book.publisher}</dd>
              <dt>On Hands:</dt>
              <dd>{this.state.book.onHands ? 'True' : 'False'}</dd>
            </dl>
            <Link to={`/edit/${this.state.book._id}`} className="edit-btn mr-4">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.book._id)} className="delete-btn">Delete</button>
          </div>
      </div>
    );
  }
}

export default Show;
