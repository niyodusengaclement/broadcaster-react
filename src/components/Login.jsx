import React, { Component } from 'react';
import '../css/main.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginFail } from '../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
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
      email: '',
      password: '',   
    })
    fetch('http://localhost:5000/api/v2/auth/signin', {
      method: 'POST',
      body: JSON.stringify(this.state), 
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.data) {
        localStorage.setItem('user', res.data.token );
        return this.props.history.push('redflag/all')
        // return <Redirect to='/redflag/all' />
      }
      else {
        return this.props.loginFail(res.error)
      }
    })
    .catch(err => console.log(err))
    evt.preventDefault();
  }
  render () {
  // const msg = this.state.apiResponse.map(res => <p>{res.error} {res.message}</p>)
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
            <h2>User Credentials</h2>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={this.handleInputChanges} value={this.state.email} name="email" id="email"/>
              <label htmlFor="password">Password</label>
              <input type="password" onChange={this.handleInputChanges} value={this.state.password} autoComplete="off" name="password" id="password"/>
              <span><Link to='/register'>Don't have account? Signup</Link></span>
              <button type="submit"  >Sign in</button>
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
    loginFail: (error) => { dispatch (loginFail(error)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);