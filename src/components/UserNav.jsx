import React, { Component } from 'react';
import toggle from '../images/toggle.PNG';
import '../css/main.css';
import { Link, NavLink, withRouter } from "react-router-dom";

class UserNav extends Component {
  toggleHandle = () => {
    const nav = document.getElementById("nav")
    nav.classList.toggle('hide-mobile');
  }
  render() {
    return (
      <div>
        <div className="container" >
          <header>
            <h2 className="logo"><Link to='/home' >Broadcaster</Link></h2>
            <nav>
              <span className="hide-desktop">
                <img src={toggle} id="menu" onClick={this.toggleHandle} alt='toggle button' className="menu"/>
              </span>
              <ul className="show-desktop hide-mobile" id='nav'>
                <li><span className='exitBtn hide-desktop' onClick={this.toggleHandle} > X </span></li>
                <li><NavLink to="/home" onClick={this.toggleHandle}>Home</NavLink></li>
                <li><NavLink to="/redflag/all" onClick={this.toggleHandle}>Reports</NavLink></li>
                <li><NavLink to="/logout" onClick={this.toggleHandle}>Logout</NavLink></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>
    )
  }
}

export default withRouter(UserNav)
