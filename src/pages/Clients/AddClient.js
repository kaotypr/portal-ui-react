import React, { Component }  from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from '../../axios.instances'

import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import BackSpaceIcon from '@material-ui/icons/Backspace';
import CollectionsIcon from '@material-ui/icons/Collections';
import { Card, CardHeader, CardContent, Grid, Typography, TextField, CardMedia, Button } from '@material-ui/core';


const styles = {
  root: {
    padding: '8px',
  },
  cardwrapper: {
    padding: '8px',
    height: '100%',
  },
  card: {
    maxWidth: '70%',
    padding: '8px',
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "8px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  headline: {
    fontSize: '15pt',
    marginTop: '30px'
  },
  media: {
    paddingTop: "56.25%"
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
};

class AddClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id_perusahaan: "",
      nama_perusahaan: "",
      nomor_telepon: "",
      email: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      alamat: "",
      iconURL: "",
      icon: null
    }

    this.iconChooserInput = React.createRef();

    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.iconChooserHandler = this.iconChooserHandler.bind(this)
    this.iconChangeHandler = this.iconChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  formChangeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  iconChooserHandler(event) {
    this.iconChooserInput.current.click()
  }

  iconChangeHandler(event) {
    // console.log(this.iconChooserInput.current.files)
    this.setState({
      icon: this.iconChooserInput.current.files[0],
      iconURL: URL.createObjectURL(this.iconChooserInput.current.files[0])
    })
  }

  submitHandler(event) {
    event.preventDefault()
  
    const headers = {
      "Content-Type": "multipart/form-data"
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

    for(var pair of postData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
   }
    

    axios.post('/client', postData, headers)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log({...error})
      })
  }

  loopObjectToFormData(obj) {
    let formData = new FormData();
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key])
      }
    }

    return formData
  }

  render() {
    const { classes } = this.props
    const { 
      id_perusahaan,
      nama_perusahaan,
      nomor_telepon,
      email,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      alamat,
      iconURL
    } = this.state
    const defaultImage = "http://calgarypma.ca/wp-content/uploads/2018/01/default-thumbnail-300x225.jpg"

    const iconPreviewURL = iconURL === "" ? defaultImage :  iconURL
    const iconClassName = iconURL === "" ? classes.iconHide :  classes.iconShow


    return (
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
            <Grid container spacing={24} alignItems="flex-start" direction="row" justify="space-between">
              <Grid item xs={12} sm={6}>
                <Grid item xs={6} sm={6}>
                  <Typography align='left' className={classes.headline} variant='h5' gutterBottom>
                    Data Perusahaan
                  </Typography>
                </Grid>
                <TextField
                  id="id_perusahaan"
                  name="id_perusahaan"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="ID Perusahaan"
                  value={id_perusahaan}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="nama_perusahaan"
                  name="nama_perusahaan"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Nama Perusahaan"
                  value={nama_perusahaan}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />

                <TextField
                  type="number"
                  id="nomor_telepon"
                  name="nomor_telepon"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Nomor Telepon"
                  value={nomor_telepon}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="email"
                  name="email"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Email"
                  value={email}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />

                <Grid item xs={6} sm={6}>
                  <Typography align='left' className={classes.headline} variant='h5' gutterBottom>Alamat Perusahaan</Typography>
                </Grid>

                <TextField
                  id="provinsi"
                  name="provinsi"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Provinsi"
                  value={provinsi}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="kota"
                  name="kota"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Kota/Kabupaten"
                  value={kota}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="kecamatan"
                  name="kecamatan"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Kecamatan"
                  value={kecamatan}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="kelurahan"
                  name="kelurahan"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Kelurahan"
                  value={kelurahan}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="alamat"
                  name="alamat"
                  onChange={(event) => this.formChangeHandler(event)}
                  label="Alamat"
                  value={alamat}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  multiline={true}
                  rows={3}
                  rowsMax={5}
                  variant="filled"
                />

              </Grid>

              <Grid item  xs={12} sm={6} className="text-sm-left text-xs-left">
                <Card className={classes.card}>
                  <div className={classes.headerWrap}>
                    <CardHeader className={classes.title} title="Icon" subheader="Icon Perusahaan" />
                    <div className={classes.headerAction}>
                      <Button onClick={this.iconChooserHandler} name="iconchooser" variant="contained" color="primary" className={classes.button}>
                        Pilih Icon 
                        <CollectionsIcon className={classes.extendedIcon} />
                      </Button>
                      <input onChange={this.iconChangeHandler} ref={this.iconChooserInput} id="iconchooser_input" name="iconchooser_input" className={classes.InputFile} type="file"/>
                    </div>
                  </div>
                  <CardMedia
                    id="icon_preview"
                    name="icon_preview"
                    className={`${classes.media} ${iconClassName}`}
                    image={iconPreviewURL}
                    title="Icon Perusahaan"
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid container alignItems="center"  direction="row-reverse" justify="center" style={{padding: '30px', display: 'flex'}}>
              <Grid item container xs={4} sm={4} justify="space-between">
                <Link to='/dataclient/list'>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Cancel
                    <BackSpaceIcon className={classes.extendedIcon} />
                  </Button>
                </Link>
                <Button onClick={this.submitHandler} variant="contained" color="primary" className={classes.button}>
                  Submit
                  <SaveIcon className={classes.extendedIcon} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(AddClient))