import * as _act from '../../constants/actionType'

import axios from '@root/axios.instances'

const loginSuccess = (responseData) => {
  const expiresIn = new Date(responseData.expiration_time)
  localStorage.setItem('token', responseData.token)
  localStorage.setItem('user_id', responseData.user_id)
  localStorage.setItem('consumer_id', responseData.consumer_id)
  localStorage.setItem('expiration_time', expiresIn)
  localStorage.setItem('refresh_token', responseData.refresh_token)
  return {
    type: _act.AUTH_SUCCESS,
    payload: responseData
  }
}

const checkAuthTimeout = (expiresIn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, parseInt(expiresIn, 10) * 1000)
  }
}

const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('consumer_id')
  localStorage.removeItem('expiration_time')
  localStorage.removeItem('refresh_token')
  return {
    type: _act.AUTH_LOGOUT
  }
}

export const directLogout = () => {
  return dispatch => {
    dispatch(authLogout())
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

export const authLogin = (authData) => {
  return dispatch => {
    const payload = {
      username: authData.username,
      password: authData.password,
      remember: authData.remember // to get userId token and refreshToken for re-extend expires Time login session 
    }
    
    dispatch(authStart(authData))

    axios.post('/signin', payload)
      .then(response => {
        dispatch(loginSuccess(response.data))
        const expire = new Date(response.data.expiration_time)
        const expiresIn = (expire.getTime() - new Date().getTime()) / 1000
        dispatch(checkAuthTimeout(expiresIn))
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log({...error})
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
    const expire = new Date(expirationTime)
    const expiresIn = (expire.getTime() - new Date().getTime()) / 1000
    if (currentToken && userId && consumerId && refreshToken && expirationTime) {
      if (expire <= new Date()) {
        dispatch(authLogout())
      } else {
        dispatch( 
          loginSuccess({
            token: currentToken, 
            expiration_time: expirationTime, 
            user_id: userId, 
            consumer_id: consumerId, 
            refresh_token: refreshToken
          })
        )
        dispatch(checkAuthTimeout(expiresIn))
      }
    } else {
      dispatch(authLogout())
    }

  }
}