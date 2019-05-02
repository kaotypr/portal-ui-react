import React, { Component }  from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Grid, Typography, TextField, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import * as utils from '../../utils/utility'
import Alert from '../../utils/ui/Alert';


const styles = {
  root: {
    padding: '8px',
    height: '100%',
    maxHeight: '100%'
  },
  card: {
    padding: '8px',
    height: '100%'
  },
  title: {
    color: 'primary',
    fontSize: '20pt'
  }
};

class DetailUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tanggal_registrasi: "",
      tanggal_verifikasi: "",
      nik: "",
      nama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "LAKI-LAKI",
      openalert: false,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${process.env.REACT_APP_PORTAL_API}/user/${id}`
    axios.get(url)
      .then(response => {
        const updateState = {
          tanggal_registrasi: response.data.identity.created_at || "",
          tanggal_verifikasi: response.data.identity.created_at || "",
          nik: response.data.identity.nik || "",
          nama: response.data.identity.nama_lengkap || "",
          tanggal_lahir: response.data.identity.tanggal_lahir || "",
          tempat_lahir: response.data.identity.tempat_lahir || "",
          jenis_kelamin: response.data.identity.jenis_kelamin
        }
        this.setState({...updateState})
      })
      .catch(error => {
        console.log({...error})
      })
  }

  render() {
    const { classes } = this.props 
    const { 
      tanggal_registrasi, 
      tanggal_verifikasi, 
      nik, 
      nama,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin
    } = this.state
    return (
      <div className={classes.root}>
        <Alert
          open={this.state.openalert}
          title={this.state.alerttitle}
          content={this.state.alertcontent} 
          firstoption={this.state.firstoption}
          firsthandler={this.state.firsthandler}
        />
        <Card square className={classes.card}>
          <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Users Data Detail"
              subheader="Cheking users data set"
            />
          <CardContent>
            <Grid container spacing={24} alignItems="flex-start" direction="row" justify="space-between">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>Tanggal Registrasi, {utils.dateGlobalFormat(new Date(tanggal_registrasi))}</Typography>
                <Typography variant="body1" gutterBottom>Tanggal Verifikasi, {utils.dateGlobalFormat(new Date(tanggal_verifikasi))}</Typography>
                <TextField
                  id="nik"
                  label="ID (KTP)"
                  defaultValue=""
                  value={nik}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"/>
                <TextField
                  id="nama"
                  label="Nama"
                  defaultValue="Nama"
                  value={nama}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"/>
                <Grid container spacing={12}>
                  <Grid xs={6} sm={6}>
                    <TextField
                      id="tempat_lahir"
                      label="Tempat Lahir"
                      defaultValue="Tempat Lahir"
                      value={tempat_lahir}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"/>
                  </Grid>
                  <Grid xs={6} sm={6} direction="row">
                    <TextField
                      id="tanggal_lahir"
                      label="Tanggal Lahir"
                      defaultValue="Tanggal Lahir"
                      value={tanggal_lahir}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"/>
                  </Grid>
                </Grid>
                <Grid container spacing={12}>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={classes.group}
                    value={jenis_kelamin}
                    onChange={() => {}}>
                    <FormControlLabel disabled={true} value="PEREMPUAN" control={<Radio />} label="PEREMPUAN" />
                    <FormControlLabel disabled={true} value="LAKI-LAKI" control={<Radio />} label="LAKI-LAKI" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid item  xs={12} sm={6} className="text-sm-right text-xs-left">
              <TextField
                  id="nik-read-only-input"
                  label="ID (KTP)"
                  defaultValue=""
                  value={nik}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"/>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(DetailUser))