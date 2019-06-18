import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SaveIcon from '@material-ui/icons/Save'


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  extendedIconLeft: {
    marginRight: theme.spacing.unit,
  },
  extendedIconRight: {
    marginLeft: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = step => step.optional === true;

  handleNext = () => {
    const { activeStep } = this.state
    let { skipped } = this.state
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values())
      skipped.delete(activeStep)
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    })
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  };

  handleSkip = () => {
    const { activeStep } = this.state
    const { steps } = this.props
    if (!this.isStepOptional(steps[activeStep])) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.')
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values())
      skipped.add(activeStep)
      return {
        activeStep: state.activeStep + 1,
        skipped,
      }
    })
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  render() {
    const { classes, steps, getStepContent, submitHandler } = this.props
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((dstep, index) => {
            const props = {}
            const labelProps = {}
            if (this.isStepOptional(dstep)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>
            }
            if (this.isStepSkipped(index)) {
              props.completed = false
            }
            return (
              <Step key={dstep.label} {...props}>
                <StepLabel {...labelProps}>{dstep.label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Grid container alignItems="center"  direction="row" justify="center" style={{padding: '30px', display: 'flex'}}>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Grid>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <Grid container alignItems="center"  direction="row" justify="center" style={{padding: '30px', display: 'flex'}}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  <ChevronLeftIcon className={classes.extendedIconLeft} />
                  Back
                </Button>
                {this.isStepOptional(steps[activeStep]) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}>
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? submitHandler : this.handleNext }
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 
                    <Fragment>
                      Submit
                      <SaveIcon className={classes.extendedIconRight} />
                    </Fragment> : 
                    <Fragment>
                      Next
                      <ChevronRightIcon className={classes.extendedIconRight} />
                    </Fragment>
                  }
                </Button>
              </Grid>
            </div>
          )}
        </div>
      </div>
    )
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
  steps: PropTypes.array.isRequired,
  getStepContent: PropTypes.func.isRequired,
  submitHandler: PropTypes.func,
}

export default withStyles(styles)(HorizontalLinearStepper)