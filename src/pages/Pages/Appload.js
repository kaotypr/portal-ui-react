import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import SessionStyles from '../../styles/Session'

const Appload = (props) => {
  const { classes } = props

  return (
    <div className={classes.session}>
      <div className={classes.content}>
        <CircularProgress className={classes.progress} thickness={4} size={50} color="primary"/>
        <Typography component="h2" variant="h3" gutterBottom>
          <br/>
          Authenticating
        </Typography>
        {/* <Typography className={classes.subtitle}>Page not found!</Typography>
        <Typography variant="caption">Sorry, but the page you were trying to view does not exist. <a>Report this error?</a></Typography> */}
      </div>
    </div>
  )
}

Appload.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(SessionStyles)(Appload)