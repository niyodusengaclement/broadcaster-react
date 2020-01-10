import React, { Component } from 'react';
import '../css/main.css';
import { Link } from 'react-router-dom';

class Redflags extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       reports: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:5000/api/v1/red-flags', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth': localStorage.getItem('user')
      }
    })
    .then(res => res.json())
    .then(res => this.setState({ reports: res.data }))
    .catch(err => console.log(err))
    }
  render() {
    console.log(localStorage.getItem('user'))
  const { reports } = this.state;
    return (
      <div>
        <div className="">
          <div className="results">
            <h2>Redflags and Interventions</h2>
            <div className="shortInfo">
              {reports.map(repo => <p key={repo.id}> {repo.id}.  <Link to='/redflag/:id' >{repo.title} </Link> </p>  )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Redflags;
