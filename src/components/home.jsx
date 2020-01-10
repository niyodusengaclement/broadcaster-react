import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import simba from '../images/simba.png';
import calender from '../images/calender.PNG';
import testimonial from '../images/testimonial.png';
import arrow from '../images/arrow.png';
import '../css/main.css';

class home extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <section>
            <img src={simba} alt="simba" className='server' />
            <h1>Broadcaster system is citizen program</h1>
            <p className="subhead">This progrma will help citizen to report problems</p>
            <img src={arrow} alt="scroll down" className="scroll hide-mobile show-desktop"/>

          </section>
        </div>
        <div className="blue-container">
          <div className="container">
            <ul>
              <li>
                <img src={calender} alt="Calender icon"/>
                <p>You should select date and time of proclaim</p>
              </li>
              <li>
                <img src={calender} alt="Calender icon"/>
                <p>You should select date and time of proclaim</p>
              </li>
              <li>
                <img src={calender} alt="Calender icon"/>
                <p>The href attribute requires a valid value to be accessible.  </p>
              </li>
              <li>
                <img src={calender} alt="Calender icon"/>
                <p>The href attribute requires a valid value to be accessible.  </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="gray-container">
          <div className="container">
            <ul>
              <li>
                <figure>
                <img src={testimonial} alt="testimonial"/>
                <blockquote>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. </blockquote>
                <figcaption>-Mistico</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                <img src={testimonial} alt="testimonial"/>
                <blockquote>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. </blockquote>
                <figcaption>-Mistico</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                <img src={testimonial} alt="testimonial"/>
                <blockquote>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. </blockquote>
                <figcaption>-Mistico</figcaption>
                </figure>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <h2>Its free to register</h2>
          <Link to="/register" className='largeBtn' >Register now</Link>
        </div>

        <footer>
          <div className="footer-container">
            <div className="container">
              <h2 className="logo"><Link to='/home'>Broadcaster </Link></h2>
              <p className="address">10 KN2019 ave, Kigali <br/> Rwanda </p>
              <ul className="footer-links">
                <li><Link to="/terms">Terms and Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default home;
