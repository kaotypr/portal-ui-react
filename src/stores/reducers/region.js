import * as _act from '@constants/actionType'
import { updateObject, 
  // getObjectOfArrayObjects, 
  // updateObjectOfArrayObjects, 
  addPropertyOfObject } from '@utils/utility'

const initialState = {
  provinces: [],
  regencies: {},
  districts: {},
  villages: {}
}

const initProvinces = (state, payload) => {
  if (state.provinces !== payload) {
    return updateObject(state, { 
      ...state,
      provinces: payload
    })
  }

  return state
}

const setRegencies = (state, payload) => {
  const currentRegencies = { ...state.regencies }
  const addedRegencies =  addPropertyOfObject(currentRegencies, payload.province_id, payload.regencies)

  return updateObject(state, { 
    ...state,
    regencies: addedRegencies
  })
}

const setDistricts = (state, payload) => {
  const currentDistricts = { ...state.districts }
  const addedDistricts =  addPropertyOfObject(currentDistricts, payload.regency_id, payload.districts)

  return updateObject(state, { 
    ...state,
    districts: addedDistricts
  })
}

const setVillages = (state, payload) => {
  const currentVillages = { ...state.villages }
  const addedVillages =  addPropertyOfObject(currentVillages, payload.district_id, payload.villages)

  return updateObject(state, { 
    ...state,
    villages: addedVillages
  })
}


const regionReducer = (state = initialState, action) => {
  switch (action.type) {
    case _act.INIT_PROVINCES: return initProvinces(state, action.payload)
    case _act.SET_REGENCIES: return setRegencies(state, action.payload)
    case _act.SET_DISTRICTS: return setDistricts(state, action.payload)
    case _act.SET_VILLAGES: return setVillages(state, action.payload)
    default: return state
  }
}

export default regionReducer