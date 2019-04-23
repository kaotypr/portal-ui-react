import * as _act from '../../constants/actionType'

import axios from 'axios'

const loginSuccess = (responseData) => {
  const expiresToken = new Date(responseData.expiration_time)
  localStorage.setItem('token', responseData.token)
  localStorage.setItem('user_id', responseData.user_id)
  localStorage.setItem('consumer_id', responseData.consumer_id)
  localStorage.setItem('expiration_time', expiresToken)
  localStorage.setItem('refresh_token', responseData.refresh_token)
  return {
    type: _act.AUTH_SUCCESS,
    payload: responseData
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, parseInt(expirationTime, 10) * 1000)
  }
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('consumer_id')
  localStorage.removeItem('expiration_time')
  localStorage.removeItem('refresh_token')
  return {
    type: _act.AUTH_LOGOUT
  }
}

const authFail = (error) => {
  return {
    type: _act.AUTH_FAIL,
    error: error
  }
}

const authStart = () => {
  return {
    type: _act.AUTH_START
  }
}

export const setRedirectAuthPath = (pathname) => {
  return {
    type: _act.SET_REDIRECT_AUTH_PATH,
    pathname: pathname
  }
}

export const authLogin = (authData, identifier) => {
  return dispatch => {
    const payload = {
      username: authData.username,
      password: authData.password,
      remember: authData.remember // to get userId token and refreshToken for re-extend expires Time login session 
    }

    let url = `${process.env.REACT_APP_PORTAL_API}/signin`
    
    dispatch(authStart(authData))

    axios.post(url, payload)
      .then(response => {
        console.log(response)
        dispatch(loginSuccess(response.data))
        // dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const currentToken = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const consumerId = localStorage.getItem('consumer_id')
    const refreshToken = localStorage.getItem('refresh_token')
    const expirationTime = localStorage.getItem('expiration_time')

    dispatch(authStart())

    if (currentToken) {
      const expire = new Date(expirationTime)
      if (expire <= new Date()) {
        dispatch(authLogout())
      } else {
        dispatch(
          loginSuccess({
            token: currentToken, 
            expires_in: expirationTime, 
            user_id: userId, 
            consumer_id: consumerId, 
            refresh_token: refreshToken
          })
        )
        dispatch(checkAuthTimeout(expire))
      }
    } else {
      dispatch(authLogout())
    }

  }
}