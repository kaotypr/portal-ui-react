import React, { Fragment, Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import { Card, CardHeader, CardContent, Grid, Button } from '@material-ui/core'
import BackSpaceIcon from '@material-ui/icons/Backspace'

import ClientForm from './partials/ClientForm'
import axios, { TokenizedURL } from '@root/axios.instances'

import { clog } from '@utils/utility'



const styles = theme => {
  return ({
    root: {
      padding: '10px',
    },
    cardwrapper: {
      padding: theme.spacing.unit,
      height: '100%',
    },
    viewOnly: {
      color: '#2d2a2a'
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
class DetailClient extends Component {
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
      iconURL: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`client/${id}`)
      .then(response => {
        this.setState({
          id_perusahaan: response.data.id_perusahaan,
          nama_perusahaan: response.data.nama,
          nomor_telepon: response.data.nomor_telepon,
          email: response.data.email,
          provinsi: response.data.provinsi,
          kota: response.data.kota,
          kecamatan: response.data.kecamatan,
          kelurahan: response.data.kelurahan,
          alamat: response.data.alamat,
          iconURL: TokenizedURL(`/client/${id}/image`)
        })
        clog(response)
      })
      .catch(error => {
        clog(error)
      })
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <div className={classes.root}>
          <Card square className={classes.cardwrapper}>
            <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Detail Client"
              subheader="detail data client"
            />
            <CardContent>
              <ClientForm 
                readOnly={true}
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
              />
              <Grid container alignItems="center"  direction="row" justify="center" style={{padding: '30px', display: 'flex'}}>
                <Grid item container justify="space-between">
                  <Link to='/clients'>
                    <Button variant="contained" color="secondary" className={classes.button}>
                      Back
                      <BackSpaceIcon className={classes.extendedIcon} />
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        {/* <div>{this.props.match.params.id}</div> */}
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(DetailClient))