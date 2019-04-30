import React, { Component }  from 'react'
import { withStyles } from '@material-ui/core/styles';
import Alert from '../../utils/ui/Alert';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@material-ui/core';


const styles = {
  root: {
    padding: '8px',
    height: '100%',
    maxHeight: '100%'
  },
  card: {
    padding: '8px',
    height: '100%'
  },
  title: {
    color: 'primary',
    fontSize: '20pt'
  }
};

class DetailUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openalert: false
    }
  }

  render() {
    const { classes } = this.props 
    console.log(this.props)
    return (
      <div className={classes.root}>
        <Alert
          open={this.state.openalert}
          title={this.state.alerttitle}
          content={this.state.alertcontent} 
          firstoption={this.state.firstoption}
          firsthandler={this.state.firsthandler}
        />
        <Card square className={classes.card}>
          <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Users Data"
              subheader="Cheking users data set"
            />
          <CardContent>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(DetailUser))