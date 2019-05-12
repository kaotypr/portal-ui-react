import * as _act from '../../constants/actionType'
import { updateObject } from '../../utils/utility'

const initialState = {
  name: 'Kaoなし',
  accessRoutes: [
    { 
      path: '/', 
      nested: false
    },
    {
      path: '/data',
      nested: true,
      children: [{
          path: '/checking',
          nested: false,
        },{
          path: '/validation',
          nested: false,
        }]
    },
    {
      path: '/dataclient',
      nested: true,
      children: [{
          path: '/list',
          nested: false,
        }]
    },
    // { 
    //   path: '/pages', 
    //   nested: true,
    //   childs: [
    //     {
    //       path: '/invoice',
    //       nested: false,
    //     },
    //     {
    //       path: '/timeline',
    //       nested: false,
    //     },
    //     {
    //       path: '/blank',
    //       nested: false,
    //     },
    //     {
    //       path: '/pricing',
    //       nested: false,
    //     },
    //   ]
    // },
    // {
    //   path: '/apps',
    //   nested: true,
    //   children: [{
    //       path: '/calendar',
    //       nested: false,
    //     },{
    //       path: '/media',
    //       nested: false,
    //     }]
    // }
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