import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../images/dumbbell.png';

class Navbar extends Component {
  
    render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
      </button>
            <Link className="navbar-brand" to="/"><img src={logo} width="50px" alt="logo"/></Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-link">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/customerlist">
                            Customers
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/traininglist">
                            Training schedule
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/calendar">
                            Calendar
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;