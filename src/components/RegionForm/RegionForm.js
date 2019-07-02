import React from 'react'
import PropTypes from 'prop-types'

import axios from '@root/axios.instances'
import SelectComponent from '@components/Selects/Selects'
import { pickFromArrayObject, clog } from '@utils/utility'

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

class RegionForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      provinces: [],
      regencies: [],
      districts: [],
      villages: [],
      province: { value: props.lastData.provinsi || ''  },
      regency: { value: props.lastData.kota || '' },
      district: { value: props.lastData.kecamatan || '' },
      village: { value: props.lastData.kelurahan || '' },
      disableProvince: props.readOnly ? true : false,
      disableRegency: true,
      disableDistrict: true,
      disableVillage: true,
      multiFormData: [{
        province: { value: '' },
        regency: { value: '' },
        district: { value: '' },
        village: { value: '' }
      }]
    }

    this.onSelectProvince = this.onSelectProvince.bind(this)
    this.onSelectRegency = this.onSelectRegency.bind(this)
    this.onSelectDistrict = this.onSelectDistrict.bind(this)
    this.onSelectVillage = this.onSelectVillage.bind(this)
  }

  getProvinces() {
    // get all provinces at first mount
    axios.get('/provinces')
      .then(result => {
        const reformedProvinces = reFormRespond(result.data, 'id_provinsi')
        this.setState({ provinces: reformedProvinces })
      })
      .catch(error => {
        clog({...error})
      })
  }

  getRegencies(province_id) {
    axios.get(`/regencies/${province_id}`)
      .then(result => {
        const reformedRegencies = reFormRespond(result.data, 'id_kabupaten')
        this.setState({ regencies: reformedRegencies })
      })
      .catch(error => {
        clog({...error})
      })
  }

  getDistricts(regency_id) {
    axios.get(`/districts/${regency_id}`)
      .then(result => {
        const reformedDistrict = reFormRespond(result.data, 'id_distrik')
        this.setState({ districts: reformedDistrict })
      })
      .catch(error => {
        clog({...error})
      })
  }

  getVillages(district_id) {
    axios.get(`/villages/${district_id}`)
      .then(result => {
        const reformedVillages = reFormRespond(result.data, 'id_kelurahan')
        this.setState({ villages: reformedVillages })
      })
      .catch(error => {
        clog({...error})
      })
  }

  reupdateState() {
    this.getProvinces()
    const { lastData } = this.props 
    if ( lastData.provinsi !== '' || lastData.provinsi !== this.state.province.value  ) {
      this.getRegencies(lastData.provinsi)
      if (  lastData.kota !== '' || lastData.kota !== this.state.regency.value ) {
        this.getDistricts(lastData.kota)
        if ( lastData.kecamatan !== '' || lastData.kecamatan !== this.state.district.value ) {
          this.getVillages(lastData.kecamatan)
        }
      }
    }
  }

  componentDidMount() {
    this.reupdateState()
  }

  onSelectProvince(event) {
    const selectedProvinceObj = pickFromArrayObject(this.state.provinces, 'value', event.target.value)
    const { multiForm, index, parentUpdater } = this.props
    const nextState = { 
      province: selectedProvinceObj,
      regency: { value: '' },
      district: { value: '' },
      village: { value: '' },
      disableRegency: false
    } 

    // if (multiForm !== true) {
    this.setState({ ...nextState })
    // } else {
    //   const curState = this.state
    //   curState.multiFormData[index] = nextState
    //   this.setState({ ...curState })
    // }

    this.getRegencies(event.target.value)

    if (multiForm === true) {
      parentUpdater(event, index, selectedProvinceObj)
    } else {
      parentUpdater(event, selectedProvinceObj)
    }
  }

  onSelectRegency(event) {
    const selectedRegencyObj = pickFromArrayObject(this.state.regencies, 'value', event.target.value)
    this.setState({ 
      regency: selectedRegencyObj,
      district: { value: '' },
      village: { value: '' },
      disableDistrict: false
    })
    this.getDistricts(event.target.value)

    const { multiForm, index, parentUpdater } = this.props
    if (multiForm === true) {
      parentUpdater(event, index)
    } else {
      parentUpdater(event)
    }
  }

  onSelectDistrict(event) {
    const selectedDistrictObj = pickFromArrayObject(this.state.districts, 'value', event.target.value)
    this.setState({
      district: selectedDistrictObj,
      village: { value: '' },
      disableVillage: false
    })
    this.getVillages(event.target.value)

    const { multiForm, index, parentUpdater } = this.props
    if (multiForm === true) {
      parentUpdater(event, index, selectedDistrictObj)
    } else {
      parentUpdater(event, selectedDistrictObj)
    }
  }

  onSelectVillage(event) {
    const selectedVillageObj = pickFromArrayObject(this.state.villages, 'value', event.target.value)
    this.setState({ village: selectedVillageObj })
    
    const { multiForm, index, parentUpdater } = this.props
    if (multiForm === true) {
      parentUpdater(event, index, selectedVillageObj)
    } else {
      parentUpdater(event, selectedVillageObj)
    }
  }

  render() {
    return (
      <React.Fragment>
        <SelectComponent 
          disabled={ this.state.disableProvince }
          name={'provinsi'}
          label={'Provinsi'}
          menus={this.state.provinces}
          handleChange={this.onSelectProvince}
          value={ this.props.lastData.provinsi }
        />
        <SelectComponent
          disabled={ this.state.disableRegency }
          name={'kota'}
          label={'Kota/Kabupaten'}
          menus={this.state.regencies}
          handleChange={this.onSelectRegency}
          value={this.props.lastData.kota }
        />
        <SelectComponent 
          disabled={ this.state.disableDistrict }
          name={'kecamatan'}
          label={'Kecamatan'}
          menus={this.state.districts}
          handleChange={this.onSelectDistrict}
          value={this.props.lastData.kecamatan }
        />
        <SelectComponent 
          disabled={this.state.disableVillage}
          name={'kelurahan'}
          label={'Kelurahan'}
          menus={this.state.villages}
          handleChange={this.onSelectVillage}
          value={this.props.lastData.kelurahan }
        />
      </React.Fragment>
    )
  }

}

RegionForm.propTypes = {
  parentUpdater: PropTypes.func.isRequired,
  multiForm: PropTypes.bool,
  index: PropTypes.any,
  lastData: PropTypes.object,
  readOnly: PropTypes.bool
}

export default RegionForm