import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SelectComponent from '@components/Selects/Selects'
import { getObjectOfArrayObjects, isObjectEmpty } from '@utils/utility'

import * as actions from '@root/stores/actions'

class RegionForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
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

  onSelectProvince(event) {
    const province_id = event.target.value

    if (province_id !== '') {
      const selectedProvinceObj = getObjectOfArrayObjects(this.props.provinces, 'value', province_id)
      const { multiForm, index, parentUpdater } = this.props
  
      this.setState({ 
        province: selectedProvinceObj, 
        regency: { value: '' },
        district: { value: '' },
        village: { value: '' },
        disableRegency: false 
      }) 
      this.props.initRegencies(province_id)
  
      if (multiForm === true) {
        parentUpdater(event, index, selectedProvinceObj)
      } else {
        parentUpdater(event, selectedProvinceObj)
      }

    }
  }

  onSelectRegency(event) {
    const regency_id = event.target.value
    const province_id = this.state.province.value

    if (regency_id !== '') {
      const selectedRegencyObj = getObjectOfArrayObjects(this.props.regencies[province_id], 'value', regency_id)
      
      this.setState({ 
        regency: selectedRegencyObj,
        district: { value: '' },
        village: { value: '' },
        disableDistrict: false
      })
      this.props.initDistricts(event.target.value)
  
      const { multiForm, index, parentUpdater } = this.props
      if (multiForm === true) {
        parentUpdater(event, index)
      } else {
        parentUpdater(event)
      }
    }
  }

  onSelectDistrict(event) {
    const district_id = event.target.value
    const regency_id = this.state.regency.value

    if (district_id !== '') {
      const selectedDistrictObj = getObjectOfArrayObjects(this.props.districts[regency_id], 'value', district_id)
      
      this.setState({
        district: selectedDistrictObj,
        village: { value: '' },
        disableVillage: false
      })

      this.props.initVillages(district_id)
  
      const { multiForm, index, parentUpdater } = this.props
      if (multiForm === true) {
        parentUpdater(event, index, selectedDistrictObj)
      } else {
        parentUpdater(event, selectedDistrictObj)
      }
    }
  }

  onSelectVillage(event) {
    const village_id = event.target.value
    const district_id = this.state.district.value

    const selectedVillageObj = getObjectOfArrayObjects(this.props.villages[district_id], 'value', village_id)
    
    this.setState({ village: selectedVillageObj })
    
    const { multiForm, index, parentUpdater } = this.props
    if (multiForm === true) {
      parentUpdater(event, index, selectedVillageObj)
    } else {
      parentUpdater(event, selectedVillageObj)
    }
  }

  // componentDidMount
  componentDidMount() {
    this.props.initProvinces()
  }

  render() {
    const { provinces, regencies, districts, villages } = this.props
    const { province, regency, district } = this.state
    const selectedRegencies = (isObjectEmpty(regencies) || province.value === '' || regencies[province.value] === undefined) ? [] : regencies[province.value]
    const selectedDistricts = (isObjectEmpty(districts) || regency.value === '' || districts[regency.value] === undefined) ? [] : districts[regency.value]
    const selectedVillages = (isObjectEmpty(villages) || district.value === '' || villages[district.value] === undefined) ? [] : villages[district.value]

    return (
      <React.Fragment>
        <SelectComponent 
          disabled={ this.state.disableProvince }
          name={'provinsi'}
          label={'Provinsi'}
          menus={provinces}
          handleChange={this.onSelectProvince}
          value={ this.props.lastData.provinsi }
        />
        <SelectComponent
          disabled={ this.state.disableRegency }
          name={'kota'}
          label={'Kota/Kabupaten'}
          menus={selectedRegencies}
          handleChange={this.onSelectRegency}
          value={this.props.lastData.kota }
        />
        <SelectComponent 
          disabled={ this.state.disableDistrict }
          name={'kecamatan'}
          label={'Kecamatan'}
          menus={selectedDistricts}
          handleChange={this.onSelectDistrict}
          value={this.props.lastData.kecamatan }
        />
        <SelectComponent 
          disabled={this.state.disableVillage}
          name={'kelurahan'}
          label={'Kelurahan'}
          menus={selectedVillages}
          handleChange={this.onSelectVillage}
          value={this.props.lastData.kelurahan }
        />
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    // double regions, untuk handle inisialisasi global state
    provinces: state.regions.provinces,
    regencies: state.regions.regencies,
    districts: state.regions.districts,
    villages: state.regions.villages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initProvinces: () => dispatch(actions.getProvinces()),
    initRegencies: (province_id) => dispatch(actions.getRegencies(province_id)),
    initDistricts: (regency_id) => dispatch(actions.getDistricts(regency_id)),
    initVillages: (district_id) => dispatch(actions.getVillages(district_id))
  }
}

RegionForm.propTypes = {
  parentUpdater: PropTypes.func.isRequired,
  multiForm: PropTypes.bool,
  index: PropTypes.any,
  lastData: PropTypes.object,
  readOnly: PropTypes.bool,
  provinces: PropTypes.array,
  regencies: PropTypes.object,
  districts: PropTypes.object,
  villages: PropTypes.object,
  initProvinces: PropTypes.func,
  initRegencies: PropTypes.func,
  initDistricts: PropTypes.func,
  initVillages: PropTypes.func
}

const wrapped_connect_RegionForm = connect(mapStateToProps, mapDispatchToProps)(RegionForm)

export default wrapped_connect_RegionForm