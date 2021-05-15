import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import { history } from '../utility/history';
import Home from './Home';
import NotFoundPage from './NotFound';
import "./App.css";

function App() {

  return (
    <Router history={history}>
      <div className="base">
        <div className="header">
          <h1>Challenges FIB</h1>
        </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;