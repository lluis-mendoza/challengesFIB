import React, {Component} from 'react';
import {Router, Switch, Route} from "react-router-dom";
import { history } from '../utility/history';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import NotFoundPage from './NotFound';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { connect } from 'react-redux';
import { ProtectedRoute } from "./ProtectedRoute";
import { GoogleLogout } from 'react-google-login';
import { logout } from '../redux/actions/userActions';

class App extends Component {
  constructor(){
    super();
  }
  logout = async () => {
    console.log("Logout");
    this.props.logout();
  }
  render(){
    return (
      <Router history={history}>
        <div className="base">
          <div className="header">
            <h1>Challenges FIB</h1>
            {this.props.isAuthenticated && <p>{this.props.name}</p> }
            {this.props.isAuthenticated
            && <GoogleLogout
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                >
                </GoogleLogout>}
          </div>
          <Container>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/home" component={Home} />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route component={NotFoundPage} />
              </Switch>
          </Container>

        </div>

      </Router>
    );
  }
}
const mapState = state => {
  return {
      isAuthenticated: state.authReducer.isAuthenticated,
      name: state.authReducer.name
  };
};

export default connect(mapState, {logout})(App);