import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/nav";
import Home from "./pages/home";
import Register from "./pages/Register";
import { connect } from "react-redux";
import { loadUser, loginAdmin } from "./actions/auth-actions";
import { clearErrors } from "./actions/error-actions";
import { getSubjects } from "./actions/curriculum-actions";
import ErrorC from "./pages/errorC";
import StudentSearch from "./pages/students";
import PropTypes from "prop-types";
import PrivateRoute from "./Components/routing-components/private-route";
import PublicRoute from "./Components/routing-components/public-route";
import PrintChart from "./pages/print-chart-individual";
import PrintChartAll from "./pages/print-chart-all";
import PrintChartRC from "./pages/print-chart-report-card";
import ViewStudentGrades from "./pages/view-student-grades";
import Curriculum from "./pages/curriculum";
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

class App extends Component {
  state = {
    user: "",
    password: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getSubjects: PropTypes.func.isRequired
  }
  sendSocketIO() {
    socket.emit('example_message', 'demo');
  }
  componentDidMount() {
    this.props.loadUser();
    this.props.getSubjects();
    this.sendSocketIO();
  }
  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  loginSubmit = event => {
    event.preventDefault();
    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginAdmin(userData);
  };
  render() {
    this.sendSocketIO = this.sendSocketIO.bind(this);
    console.log(socket)
    return (
      <Router>
        <>
          <Navigation handleInputChange={this.handleInputChange}
            loginSubmit={this.loginSubmit}
            clearErrors={this.props.clearErrors}
            user={this.props.auth.user}
            isAuthenticated={this.props.isAuthenticated}
            isLoading={this.props.auth.isLoading}
          />
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/students" component={StudentSearch} />

            <PrivateRoute exact path="/print-chart" component={PrintChart} />
            <PrivateRoute exact path="/print-chart-all" component={PrintChartAll} />
            <PrivateRoute exact path="/print-chart-rc" component={PrintChartRC} />
            <PrivateRoute exact path="/curriculum" component={Curriculum} />
            <PrivateRoute exact path="/student-grades" component={ViewStudentGrades} />
            <Route component={ErrorC} />
          </Switch>
        </>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
})
export default connect(mapStateToProps,
  { clearErrors, loginAdmin, loadUser, getSubjects }
)(App);
