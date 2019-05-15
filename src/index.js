import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import AppProvider from '@components/AppProvider/AppProvider'

import * as serviceWorker from './serviceWorker'
import rootReducer from '@reducers'
import AppBasename from '@constants/appBasename'
import * as Util from '@utils/utility'
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
// mterial ui next typography consid
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const app = (
  <Provider store={store}>
    <BrowserRouter basename={AppBasename}>
      <AppProvider>
        <App/>
      </AppProvider>
    </BrowserRouter>
  </Provider>)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()