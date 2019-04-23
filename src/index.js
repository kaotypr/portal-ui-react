import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import AppProvider from './components/AppProvider/AppProvider';

// import Dashboard from './containers/Dashboard';
import { 
  NotFound, 
  BackendError, 
  Signin, 
  Signup, 
  PasswordReset, 
  Lockscreen,
} from './pages';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './stores/reducers'
import AppBasename from './constants/appBasename'
import * as Util from './utils/utility'
import App from './App'

const logger = store => {
  return next => {
    return action => {
      Util.clog(action, '[Middleware] dispatching')
      const result = next(action)
      Util.clog(store.getState(), '[Middleware] next state')
      return result
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancher = composeEnhancers(applyMiddleware(logger, thunk))
const store = createStore(rootReducer, enhancher)

const app = (
  <Provider store={store}>
    <AppProvider>
      <BrowserRouter basename={AppBasename}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/error" component={BackendError} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={PasswordReset} />
          <Route exact path="/lockscreen" component={Lockscreen} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </Provider>);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
