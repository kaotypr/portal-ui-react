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
      province: { value: '' },
      regency: { value: '' },
      district: { value: '' },
      village: { value: '' },
      disableRegency: true,
      disableDistrict: true,
      disableVillage: true
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
        clog(result)
        this.setState({ villages: reformedVillages })
      })
      .catch(error => {
        clog({...error})
      })
  }

  componentDidMount() {
    this.getProvinces()
  }

  onSelectProvince(event) {
    const selectedProvinceObj = pickFromArrayObject(this.state.provinces, 'value', event.target.value)
    this.setState({ 
      province: selectedProvinceObj,
      regency: { value: '' },
      district: { value: '' },
      village: { value: '' },
      disableRegency: false
    })

    this.getRegencies(event.target.value)
    this.props.parentUpdater('provinsi', selectedProvinceObj)
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
    this.props.parentUpdater('kota', selectedRegencyObj)
  }

  onSelectDistrict(event) {
    const selectedDistrictObj = pickFromArrayObject(this.state.districts, 'value', event.target.value)
    this.setState({
      district: selectedDistrictObj,
      village: { value: '' },
      disableVillage: false
    })
    this.getVillages(event.target.value)
    this.props.parentUpdater('kecamatan', selectedDistrictObj)
  }

  onSelectVillage(event) {
    const selectedVillageObj = pickFromArrayObject(this.state.villages, 'value', event.target.value)
    this.setState({ village: selectedVillageObj })
    this.props.parentUpdater('kelurahan', selectedVillageObj)
  }

  render() {
    return (
      <React.Fragment>
        <SelectComponent 
          name={'province'}
          label={'Provinsi'}
          menus={this.state.provinces}
          handleChange={this.onSelectProvince}
          value={this.state.province.value}
        />
        <SelectComponent
          disabled={this.state.disableRegency}
          name={'regency'}
          label={'Kota/Kabupaten'}
          menus={this.state.regencies}
          handleChange={this.onSelectRegency}
          value={this.state.regency.value}
        />
        <SelectComponent 
          disabled={this.state.disableDistrict}
          name={'district'}
          label={'Kecamatan'}
          menus={this.state.districts}
          handleChange={this.onSelectDistrict}
          value={this.state.district.value}
        />
        <SelectComponent 
          disabled={this.state.disableVillage}
          name={'village'}
          label={'Kelurahan'}
          menus={this.state.villages}
          handleChange={this.onSelectVillage}
          value={this.state.village.value}
        />
      </React.Fragment>
    )
  }

}

RegionForm.propTypes = {
  parentUpdater: PropTypes.func.isRequired
}

export default RegionForm