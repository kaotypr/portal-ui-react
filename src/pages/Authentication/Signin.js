import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import * as actions from '../../stores/actions'

import SessionStyles from '../../styles/Session';

const Signin = (props) => {
  const component = new React.Component(props);
  const { classes } = props;
  component.state = {
    username: "",
    password: "",
    remember: false
  }

  function handleChange(event) {
    component.setState({[event.target.name]: event.target.value});
  }

  function handleRemember(event) {
    component.setState({[event.target.name]: !component.state.remember});
  }

  function validateForm() {
    return true
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return
    }

    const authData = {
      username: component.state.username,
      password: component.state.password,
      remember: component.state.remember
    }

    props.authLogin(authData)
  }

  component.render = function(){

    console.log("IS AUTHENTICATED ? ", component.props.isAuthenticated)
    if (component.props.isAuthenticated === true) {
      component.props.history.push({pathname: '/'})
    }

    return (
      <div className={classNames(classes.session, classes.background)}>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="text-xs-center pb-xs">
                    <img src="/static/images/logo.png" alt=""/>
                    <Typography variant="caption">Sign in with your app id to continue.</Typography>
                  </div>
                  <TextField
                    id="username"
                    label="Username"
                    name="username"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    type="password"
                    fullWidth
                    margin="normal"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        onChange={handleRemember}
                        checked={component.state.remember}
                        value="checkedA"
                      />
                    }
                    label="Stayed logged in"
                    className={classes.fullWidth}
                  />
                  <Button variant="raised" color="primary" fullWidth type="submit">Login</Button>
                  <div className="pt-1 text-md-center">
                    <Link to="/forgot">
                      <Button>Forgot password?</Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/signup">
                      <Button>Create new account.</Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return component
}

const mapStateToProps = state => {
  return {
    authenticating: state.auth.loading,
    isAuthenticated:!!state.auth.token && !!state.auth.userId,
    error: state.auth.error,
    checked: state.auth.checked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authLogin: (authData) => dispatch(actions.authLogin(authData))
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
  authLogin: PropTypes.func.isRequired,
  authenticating: PropTypes.bool,
  error: PropTypes.string,
  checked: PropTypes.bool
};


const wrapped_withStyles_signin = withStyles(SessionStyles)(Signin);
const wrapped_connect_signin = connect(mapStateToProps, mapDispatchToProps)(wrapped_withStyles_signin)
const wrapped_withRouter_signin = withRouter(wrapped_connect_signin)

export default wrapped_withRouter_signin
