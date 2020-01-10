import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';
import { connect } from 'react-redux';
import { signupFail } from '../actions/userActions';

class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       firstname: '',
       lastname: '',
       email: '',
       username: '',
       phoneNumber: '',
       password: '',
    }
  }
  
  handleInputChanges = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  formHandler = (evt) => {
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      phoneNumber: '',
      password: '',
    })
    fetch('http://localhost:5000/api/v2/auth/signup', {
      method: 'POST',
      body: JSON.stringify(this.state), 
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
      }
    })
    .then( res => res.json())
    .then(res => {
      if (res.data) {
        localStorage.setItem('user', res.data.token );
        return this.props.history.push('/login')
        // return <Redirect to='/redflag/all' />
      }
      else {
        return this.props.signupFail(res.error)
      }
    })
    .catch(err => console.log(err))
    evt.preventDefault();
  }
  render () {
    return (
      <div>
        <div className="container">
          <div className="formShape">
            <div className="formSideInfo">
              <h2>Tips</h2>
              <p>
              Note that the development build is not optimized.
To create a production build, use npm run build.
Note that the development build is not optimized.<br />
To create a production build, use npm run build.
Note that the development build is not optimized.<br />
To create a production build, use npm run build.
              </p>
            </div>
            <form action="" onSubmit={this.formHandler}>  
            <h5>{this.props.error}</h5> 
            <h2>Personal Information</h2>            
              <label htmlFor="firstname">Firstname</label>
              <input type="text" onChange={this.handleInputChanges} value={this.state.firstname} name="firstname" id="firstname"/>
              <label htmlFor="lastname">Lastname</label>
              <input type="text" onChange={this.handleInputChanges} value={this.state.lastname} name="lastname" id="lastname"/>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={this.handleInputChanges} value={this.state.email} name="email" id="email"/>
              <label htmlFor="username">Username</label>
              <input type="text" onChange={this.handleInputChanges} value={this.state.username} name="username" id="username"/>
              <label htmlFor="phoneNumber">Phone number</label>
              <input type="tel" onChange={this.handleInputChanges} value={this.state.phoneNumber} name="phoneNumber" id="phoneNumber"/>
              <label htmlFor="password">Password</label>
              <input type="password" onChange={this.handleInputChanges} value={this.state.password} autoComplete="off" name="password" id="password"/>
              <span><Link to='/login' >Already have account? Login</Link></span>
              <button type="submit" >Sign up</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupFail: (error) => { dispatch(signupFail(error)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);