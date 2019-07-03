import * as _act from '@constants/actionType'

import axios from '@root/axios.instances'
import { clog } from '@utils/utility'

function reFormRespond(resp, valkey) {
  let formRegion = []
  resp.forEach(prov => {
    let aRegion = {
      key: prov['_id'],
      label: prov['nama'],
      value: prov[valkey]
    }
    formRegion.push(aRegion)
  })
  return formRegion
}

// PROVINCES
const initProvinces = (provinces) => {
  return {
    type: _act.INIT_PROVINCES,
    payload: provinces
  }
} 

export const getProvinces = () => {
  return (dispatch, getState) => {
    const { provinces: currentProvinces } = getState().regions

    if (currentProvinces.length === 0) {
      // get all provinces at first mount
      axios.get('/provinces')
        .then(result => {
          const reformedProvinces = reFormRespond(result.data, 'id_provinsi')
          dispatch(initProvinces(reformedProvinces))
          return reformedProvinces
        })
        .catch(error => {
          clog({...error})
        })
    }
  }
}

// REGENCIES
const setRegencies = (province_id, regencies) => {
  return {
    type: _act.SET_REGENCIES,
    payload: {
      province_id: province_id,
      regencies: regencies
    }
  }
} 

export const getRegencies = (province_id) => {
  return dispatch => {
    axios.get(`/regencies/${province_id}`)
      .then(result => {
        const reformedRegencies = reFormRespond(result.data, 'id_kabupaten')
        dispatch(setRegencies(province_id, reformedRegencies))
      })
      .catch(error => {
        clog({...error})
      })
  }
}

// DISTRICTS
const setDistricts = (regency_id, districts) => {
  return {
    type: _act.SET_DISTRICTS,
    payload: {
      regency_id: regency_id,
      districts: districts
    }
  }
} 

export const getDistricts = (regency_id) => {
  return dispatch => {
    axios.get(`/districts/${regency_id}`)
      .then(result => {
        const reformedDistrict = reFormRespond(result.data, 'id_distrik')
        dispatch(setDistricts(regency_id, reformedDistrict))
      })
      .catch(error => {
        clog({...error})
      })
  }
}

// VILLAGES
const setVillages = (district_id, villages) => {
  return {
    type: _act.SET_VILLAGES,
    payload: {
      district_id: district_id,
      villages: villages
    }
  }
} 

export const getVillages = (district_id) => {
  return dispatch => {
    axios.get(`/villages/${district_id}`)
      .then(result => {
        const reformedVillages = reFormRespond(result.data, 'id_kelurahan')
        dispatch(setVillages(district_id, reformedVillages))
      })
      .catch(error => {
        clog({...error})
      })
  }
}