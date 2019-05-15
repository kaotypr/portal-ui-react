import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Dashboard from './containers/Dashboard'
import { Appload } from './pages'
import Aux from './hoc/Aux'
import * as actions from './stores/actions'
import { 
  NotFound, 
  BackendError, 
  Signin, 
  Signup, 
  PasswordReset, 
  Lockscreen,
} from './pages'

class App extends Component {
  state = {
    authenticated: false, // is user authenticated ? #default false
    checked: false, // is authenticating proccess has done ? #default false 
    mounted: false // is app has been mounted before ? #default false 
  }
  componentDidMount () {
    this.props.onAutoAuth()
    this.setState({mounted: true, checkingauth: true})
  }
  render () {
    const authenticating = this.props.authenticating // is in authenticating proccess
    const checked = this.props.checked // is authenticating proccess has done ? #default false , set to true after first checked neither auth success or not
    const isAuthenticated = this.props.isAuth // is user authenticated ? #default false
    // condition on first time mount, before componentDidMount
    let NextComponent = Appload
    // condition on authenticated & has been checked & app has been mounted for load AppLoader 
    if (isAuthenticated && checked && this.state.mounted) {
      NextComponent = Dashboard
    } else {
      // condition on no longer on checking auth proccess & has been checked & app has been mounted for load AppLoader
      if (authenticating === false && checked && this.state.mounted) {
        NextComponent = Signin
      }
    }

    return (
      <Aux>
        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/500" component={BackendError} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={PasswordReset} />
          <Route exact path="/lockscreen" component={Lockscreen} />
          <Route path="/" component={NextComponent} />
        </Switch>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth:!!state.auth.token && !!state.auth.userId,
    checked: state.auth.checked,
    authenticating: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoAuth: () => dispatch(actions.authCheckState())
  }
}

App.propTypes = {
  onAutoAuth: PropTypes.func.isRequired,
  authenticating: PropTypes.bool,
  checked: PropTypes.bool,
  isAuth: PropTypes.bool
}

const wrapped_connect_app = connect(mapStateToProps, mapDispatchToProps)(App)
const wrapped_withRouter_app = withRouter(wrapped_connect_app)

export default wrapped_withRouter_app