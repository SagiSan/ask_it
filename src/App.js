import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Redirect,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Question from "./containers/Question/Question";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <PublicRoute exact path="/" component={Login} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/question/:id" component={Question} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
