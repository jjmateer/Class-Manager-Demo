import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  Button,
  Form,
  Label,
  Input
} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../actions/auth-actions";
import "../Components/auth/register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    var newUser = {
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerAdmin(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <>
      <h1 className="page-header">Create Account</h1>
      <div className="register-form-wrap">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password2">Confirm Password</Label>
            <Input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" />
          </FormGroup>
          <FormGroup>
            <Button className="register-submit-btn" type="submit" >Submit</Button>
          </FormGroup>
        </Form>
      </div>
      </>
    );
  }
}

Register.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(Register));
