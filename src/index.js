import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import AppProvider from './components/AppProvider/AppProvider';

// import Dashboard from './containers/Dashboard';
import { NotFound, BackendError, Appload } from './pages';

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

render(
  <AppProvider>
    <Provider store={store}>
      <BrowserRouter basename={AppBasename}>
        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/500" component={BackendError} />
          <Route exact path="/loading" component={Appload} />
          <App />
          {/* 
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/500" component={BackendError} />
          <Route exact path="/Lockscreen" component={Lockscreen} />
          <Route exact path="/forgot" component={PasswordReset} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" component={Dashboard} /> 
          */}
        </Switch>
      </BrowserRouter>
    </Provider>
  </AppProvider>
, document.getElementById('root'));

registerServiceWorker();
