import React from 'react';
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
import SessionStyles from '../../styles/Session';

const Signup = (props) => {
  const { classes } = props;
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo.png" alt=""/>
                  <Typography variant="caption">Create an app id to continue.</Typography>
                </div>
                <TextField
                  id="username"
                  label="Username"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                />
                <TextField
                  id="email"
                  label="Email address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
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
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(Signup);