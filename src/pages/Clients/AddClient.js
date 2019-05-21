import React, { Component, Fragment }  from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from '../../axios.instances'

import { withStyles } from '@material-ui/core/styles'
import BackSpaceIcon from '@material-ui/icons/Backspace'
import { Card, CardHeader, CardContent, Grid, Button } from '@material-ui/core'
import Alert from '@ui/Alert'

import StepperWrapper from '@ui/StepperWrapper'
import ClientForm from './partials/ClientForm'
import ClientPICForm from './partials/ClientPICForm'


const styles = theme => {
  return ({
    root: {
      padding: '10px',
    },
    cardwrapper: {
      padding: theme.spacing.unit,
      height: '100%',
    },
    card: {
      maxWidth: '70%',
      padding: '8px',
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '8px',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
      }
    },
    headline: {
      fontSize: '15pt',
      marginTop: '30px'
    },
    media: {
      paddingTop: '56.25%'
    },
    title: {
      color: 'primary',
      fontSize: '20pt'
    },
    extendedIcon: {
      marginLeft: '10px',
    },
    headerWrap: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    headerAction: {
      display: 'flex',
      padding: '24px',
    },
    InputFile: {
      display: 'none'
    },
    iconHide: {
      display: 'none'
    },
    iconShow: {
      display: 'block'
    }
  })
}

class AddClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id_perusahaan: '',
      nama_perusahaan: '',
      nomor_telepon: '',
      email: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      alamat: '',
      iconURL: '',
      icon: undefined,
      openalert: false,
      alerttitle: '',
      alertcontent: '',
      alertfirstoption: '',
      alertsecondoption: '',
      alertfirsthandler: null,
      pageSteps: ['Fill Client Data', 'Add Client PIC', 'Check Form'],
      picActiveTab: 0,
      picData: [{
        nama_pic: '',
        nomor_telepon_pic: '',
        email_pic: '',
        provinsi_pic: '',
        kota_pic: '',
        kecamatan_pic: '',
        kelurahan_pic: '',
        rt_pic: '',
        rw_pic: '',
        alamat_pic: ''
      }]
    }

    this.iconChooserInput = React.createRef()

    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.iconChooserHandler = this.iconChooserHandler.bind(this)
    this.iconChangeHandler = this.iconChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.getStepContent = this.getStepContent.bind(this) 
    this.handlePicTabChange = this.handlePicTabChange.bind(this) 
    this.handlePicAddTab = this.handlePicAddTab.bind(this) 
    this.handlePicRemoveTab = this.handlePicRemoveTab.bind(this) 
    this.formPicChangeHandler = this.formPicChangeHandler.bind(this)
  }

  formChangeHandler(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  formPicChangeHandler(event, index) {
    const nextState = {...this.state}
    nextState.picData[index][event.target.name] = event.target.value
    this.setState(nextState)
  }

  iconChooserHandler() {
    this.iconChooserInput.current.click()
  }

  iconChangeHandler() {
    // console.log(this.iconChooserInput.current.files)
    this.setState({
      icon: this.iconChooserInput.current.files[0],
      iconURL: URL.createObjectURL(this.iconChooserInput.current.files[0])
    })
  }

  handlePicTabChange(event, value) {
    const maxTabs = this.state.picData.length - 1
    if (value > maxTabs) {
      this.setState({ picActiveTab: value - 1 })
    } else {
      this.setState({ picActiveTab: value })
    }
  }

  handlePicAddTab() {
    const picData = [...this.state.picData]
    picData.push({
      nama_pic: '',
      nomor_telepon_pic: '',
      email_pic: '',
      provinsi_pic: '',
      kota_pic: '',
      kecamatan_pic: '',
      kelurahan_pic: '',
      rt_pic: '',
      rw_pic: '',
      alamat_pic: ''
    })
    this.setState({ picData })
  }

  handlePicRemoveTab(indexTab) {
    const nextState = {...this.state}
    if (nextState.picData.length > 1) {
      nextState.picData.splice(indexTab, 1)
      nextState.picActiveTab = indexTab - 1
      this.setState(nextState)
    }
  }

  showAlert(title, content, options, handlers) {
    this.setState({
      openalert: true,
      alerttitle: title,
      alertcontent: content,
      alertfirstoption: options.firstoption,
      alertsecondoption: options.secondoption,
      alertfirsthandler: handlers.firsthandler,
      alertsecondhandler: handlers.secondhandler
    })
  }

  submitHandler(event) {
    event.preventDefault()
  
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const postData = this.loopObjectToFormData({
      id_perusahaan: this.state.id_perusahaan,
      nama: this.state.nama_perusahaan,
      nomor_telepon: this.state.nomor_telepon,
      email: this.state.email,
      provinsi: this.state.provinsi,
      kota: this.state.kota,
      kecamatan: this.state.kecamatan,
      kelurahan: this.state.kelurahan,
      alamat: this.state.id_perusahaan,
      icon: this.state.icon
    })

    // for(var pair of postData.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]) 
    // }
    

    axios.post('/client', postData, headers)
      .then(response => {
        this.showAlert(
          'Sukses',
          `Client ${response.data.nama} berhasil dibuat`,
          { 
            firstoption: 'Tutup', 
            secondoption: 'Lanjutkan'
          },
          { 
            firsthandler: () => this.setState({openalert: false}), 
            secondhandler: () => this.props.history.push({pathname: '/dataclient/list'})
          }
        )
      })
      .catch(error => {
        this.showAlert(
          'Terjadi kesalahan',
          error.response.data.error,
          { secondoption: 'Tutup' },
          { secondhandler: () => this.setState({openalert: false}) }
        )
      })
  }

  loopObjectToFormData(obj) {
    let formData = new FormData()
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key])
      }
    }

    return formData
  }

  getStepContent(step) {
    const { classes } = this.props
    switch (step) {
      case 0:
        return (
          <ClientForm 
            classes={classes}
            id_perusahaan={this.state.id_perusahaan}
            nama_perusahaan={this.state.nama_perusahaan}
            nomor_telepon={this.state.nomor_telepon}
            email={this.state.email}
            provinsi={this.state.provinsi}
            kota={this.state.kota}
            kecamatan={this.state.kecamatan}
            kelurahan={this.state.kelurahan}
            alamat={this.state.alamat}
            iconURL={this.state.iconURL}
            formChangeHandler={this.formChangeHandler}
            iconChooserHandler={this.iconChooserHandler}
            iconChooserInput={this.iconChooserInput}
            iconChangeHandler={this.iconChangeHandler}
          />
        )
      case 1:
        return (
          <ClientPICForm 
            handleChangeTab={this.handlePicTabChange}
            handleAddTab={this.handlePicAddTab}
            handleRemoveTab={this.handlePicRemoveTab}
            picData={this.state.picData}
            activeTab={this.state.picActiveTab}
            formChangeHandler={this.formPicChangeHandler}
          />
        )
      case 2:
        return 'Please re-check your data'
      default:
        return 'Unknown step'
    }
  }

  render() {
    const { classes } = this.props
    const { pageSteps: steps } = this.state

    return (
      <Fragment>
        <Alert 
          open={this.state.openalert} 
          title={this.state.alerttitle} 
          content={this.state.alertcontent} 
          firstoption={this.state.alertfirstoption}
          secondoption={this.state.alertsecondoption} 
          firsthandler={this.state.alertfirsthandler}
          secondhandler={this.state.alertsecondhandler}
        />
        <div className={classes.root}>
          <Card square className={classes.cardwrapper}>
            <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Tambah Data Client"
              subheader="Tambah data client"
            />
            <CardContent>
              <StepperWrapper 
                steps={steps} 
                getStepContent={this.getStepContent}
                submitHandler={this.submitHandler}
              />
              <Grid container alignItems="center"  direction="row" justify="center" style={{padding: '30px', display: 'flex'}}>
                <Grid item container justify="space-between">
                  <Link to='/dataclient/list'>
                    <Button variant="contained" color="secondary" className={classes.button}>
                      Cancel
                      <BackSpaceIcon className={classes.extendedIcon} />
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(AddClient))