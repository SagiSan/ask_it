import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { login } from "../../reducers/loginReducer";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit = (e, email, password) => {
    e.preventDefault();
    this.props.login(email, password);
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.loginSent) {
      this.props.history.push("/home");
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="Login d-flex justify-content-center align-items-center">
        <Card className="col-10 col-md-8 col-lg-4">
          <Link className="mt-2 text-right" to="/register">
            Don't have an account?
          </Link>
          <Form
            className="p-4"
            onSubmit={e => this.onSubmit(e, email, password)}
          >
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="row m-0 p-0">
              <Button color="success" className="mr-2 col-12">
                Login
              </Button>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginSent: state.login.loginSent,
    sendingRequest: state.login.sendingRequest,
    requestFailed: state.login.requestFailed
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
