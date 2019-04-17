import * as _act from '../../constants/actionType'
import { updateObject } from '../../utils/utility'

const initialState = {
  name: 'Kaoなし',
  accessRoutes: [
    { 
      path: '/', 
      nested: false
    }
  ]
}

const authSuccess = (state, payload) => {
  return updateObject(state, {
    ...state // it should be the payload.user, payload.accessRoutes Change with the new result from backend api LATER!
  })
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case _act.AUTH_SUCCESS: return authSuccess(state, action.payload)
    default: return state
  }
}

export default userReducer