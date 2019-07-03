import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import regions from './region'

const rootReducer = combineReducers({
  auth: auth,
  user: user,
  regions: regions
})

export default rootReducer