import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    zIndex: '5000 !important'
  }
};

const Alert = (props) => {
  const { classes } = props;
  return (
    <Dialog
      className={classes.root}
      open={props.open}
      onClose={props.closehandler}
      aria-labelledby="lert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{ props.title }</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { props.content }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          ((props.firstoption === "") || (props.firsthandler === undefined || props.firsthandler === null )) ? null :
            <Button onClick={props.firsthandler} color="primary">
              { props.firstoption }
            </Button>
        }
        {
          ((props.secondoption === "") || (props.secondhandler === undefined || props.secondhandler === null)) ? null :
            <Button onClick={props.secondhandler} color="primary">
              { props.secondoption }
            </Button>
        }
      </DialogActions>
    </Dialog>
  )
}


export default withStyles(styles)(Alert);
