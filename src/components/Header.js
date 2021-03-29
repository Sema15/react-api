import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";

class Header extends Component {
  render() {
    return (
        <div>
          <Router>
            <div>
              <div className="ui menu">
                <Link className="item" to="/">Home</Link>
                <Link className="item" to="/about">Курс валют</Link>
                <Link className="item" to="/dashboard">Dashboard</Link>
              </div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/dashboard" component={Dashboard}/>
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default Header;
