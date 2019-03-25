import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { register } from "../../reducers/loginReducer";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit = (e, email, password) => {
    e.preventDefault();
    this.props.register(email, password);
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.registerSent) {
      this.props.history.push("/login");
    }
    return true;
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="Register d-flex justify-content-center align-items-center">
        <Card className="col-10 col-md-8 col-lg-4">
          <Link className="mt-2 text-right" to="/login">
            Already have an account?
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
                Register
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
    registerSent: state.login.registerSent,
    sendingRequest: state.login.sendingRequest,
    requestFailed: state.login.requestFailed
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      register
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
