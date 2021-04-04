import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Disk from "../../components/disk/Disk";
import Registration from "../../components/authorization/Registration";
import Login from "../../components/authorization/Login";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../reducers/userReducer";

function Header() {

  const isAuth = useSelector(state => state.user.isAuth)
  const userMail = useSelector(state => state.user.currentUser.email)
  const dispatch = useDispatch()

  return (
      <div>
        <Router>
          <div>
            <div className="ui menu">
              <Link className="item" to="/">Home</Link>
              <Link className="item" to="/about">Курс валют</Link>
              {isAuth &&  <Link className="item" to="/disk">Диск</Link>}
              {!isAuth && <div className="right menu">
                <Link className="item" to="/registration">Регистрация</Link>
                <Link className="item" to="/login">Войти</Link>
              </div>}
              {isAuth && <div className="right menu">
                <a className="item" onClick={() => dispatch(logout())}>Выход</a>
                <a className="item">{userMail}</a>
              </div>}
            </div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              {!isAuth ?
                  <React.Fragment>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/login" component={Login}/>
                    <Redirect to="/login"/>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Route exact path="/disk" component={Disk}/>
                    <Redirect to="/disk"/>
                  </React.Fragment>
              }
            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default Header;
