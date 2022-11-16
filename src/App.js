import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from 'react-bootstrap/Button';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import OthersProfile from "./components/others-profile.component";



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Nimbus
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
              <img src ="//cdn-icons-png.flaticon.com/512/2499/2499093.png" alt ="home-img" height = "22px" width = "22px"/> 
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                <img src ="//cdn-icons-png.flaticon.com/512/880/880441.png" alt ="user-img" height = "25px" width = "25px"/> 
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <img src ="//cdn-icons-png.flaticon.com/512/3132/3132084.png" alt ="settings-img" height = "25px" width = "25px"/>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  <img src ="//cdn-icons-png.flaticon.com/512/1286/1286907.png" alt ="logout-img" height = "22px" width = "22px"/>
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  <img src ="//cdn-icons-png.flaticon.com/512/3580/3580181.png" alt ="login-img" height = "30px" width = "30px"/>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                <Button class="btn btn-primary" >Sign up</Button>
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userID" element={<OthersProfile />} />
            <Route path="/user" element={<BoardUser />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;