import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
  card: {
    position: 'relative',
    clear: 'both'
  },
  appBar: {
    boxShadow: theme.shadows[0]
  }
});

const Example = (props) => {
  const { classes, title, children } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography color="inherit" className="flexSpacer">{title}</Typography>
          </Toolbar>
        </AppBar>
        <CardContent className={classes.content}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

Example.prototypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Example);
