import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import * as utils from '../../utils/utility';
import SessionStyles from '../../styles/Session';
import Alert from '../../utils/ui/Alert'

const Signup = (props) => {
  const component = new React.Component(props);
  component.state = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    agreed: false,
    openalert: false,
    alertitle: "",
    alertcontent: "",
    firstoption: "",
    secondoption: "",
    firsthandler: null,
    secondhandler: null
  };

  function handleChange(event) {
    component.setState({[event.target.name]: event.target.value});
  }

  function handleAgreement(event) {
    component.setState({[event.target.name]: !component.state.agreed});
  }

  function validateForm() {

    const usernamevalid = (component.state.username !== "")
    if (!usernamevalid) {
      alert('Username tidak boleh kosong')
      return false
    }

    const emailvalid = utils.validateEmail(component.state.email)
    if (!emailvalid) {
      alert('Format email tidak valid')
      return false
    } 

    const passwordNotempty = component.state.password !== ""
    const passwordMatch = utils.passwordMatch(component.state.password, component.state.cpassword)
    if (!passwordMatch || !passwordNotempty) {
      alert('Password tidak sesuai')
      return false
    } 

    const agreed = (component.state.agreed)
    if (!agreed) {
      alert('Mohon centang persetujuan')
      return false
    }

    return agreed && usernamevalid && emailvalid && passwordMatch
  }

  function showAlert(title, content, options, handlers) {
    component.setState({
      openalert: true,
      alerttitle: title,
      alertcontent: content,
      firstoption: options.firstoption,
      secondoption: options.secondoption,
      firsthandler: handlers.firsthandler,
      secondhandler: handlers.secondhandler
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return
    }

    let url = `${process.env.REACT_APP_PORTAL_API}/signup`

    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const payload = {
      username: component.state.username,
      email: component.state.email, 
      password: component.state.password
    }

    axios.post(url, payload, config)
    .then(response => {
      showAlert(
        "Sukses",
        `Username ${response.data.username} berhasil didaftarkan. \n Login untuk melanjutkan ?`,
        { 
          firstoption: "Tutup", 
          secondoption: "Lanjutkan"
        },
        { 
          firsthandler: () => component.setState({openalert: false}), 
          secondhandler: () => props.history.push({pathname: '/signin'})
        }
      )
    })
    .catch(error => {
      if (error.response.status === 500) {
        props.history.push({pathname: '/error'})
      } else {
        showAlert(
          "Terjadi kesalahan",
          error.response.data.error,
          { secondoption: "Tutup" },
          { secondhandler: () => component.setState({openalert: false}) }
        )
      }
    })
  }

  const { classes } = props;
  component.render = function() {
    return (
      <Fragment>
        <Alert 
          open={this.state.openalert} 
          title={this.state.alerttitle} 
          content={this.state.alertcontent} 
          firstoption={this.state.firstoption}
          secondoption={this.state.secondoption} 
          firsthandler={this.state.firsthandler}
          secondhandler={this.state.secondhandler}
        />
        <div className={classNames(classes.session, classes.background)}>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="text-xs-center pb-xs">
                      <img src="/static/images/logo.png" alt=""/>
                      <Typography variant="caption">Create an app id to continue.</Typography>
                    </div>
                    <TextField
                      id="username"
                      label="Username"
                      name="username"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      autoComplete="off"
                      value={component.state.username}
                      onChange={handleChange}
                    />
                    <TextField
                      id="email"
                      label="Email address"
                      name="email"
                      className={classes.textField}
                      fullWidth
                      margin="normal"
                      autoComplete="off"
                      value={component.state.email}
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
                      autoComplete="off"
                      value={component.state.password}
                      onChange={handleChange}
                    />
                    <TextField
                      id="cpassword"
                      label="Confirm Password"
                      name="cpassword"
                      className={classes.textField}
                      type="password"
                      fullWidth
                      margin="normal"
                      autoComplete="off"
                      value={component.state.cpassword}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreed"
                          value="checkedA"
                          checked={component.state.agreed}
                          onChange={handleAgreement}
                        />
                      }
                      label="I have read and agree to the terms of service."
                      className={classes.fullWidth}
                    />
                    <Button variant="raised" color="primary" fullWidth type="submit">Create your account</Button>
                    <div className="pt-1 text-xs-center">
                      <Link to="/forgot">
                        <Button>Forgot password?</Button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/signin">
                        <Button>Access your account.</Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Fragment>

    );
  }

  return component
}

const wrapped_withStyles_Signup = withStyles(SessionStyles)(Signup);

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default wrapped_withStyles_Signup