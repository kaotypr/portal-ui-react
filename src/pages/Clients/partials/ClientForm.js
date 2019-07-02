import React from 'react'
import PropTypes from 'prop-types'

import CollectionsIcon from '@material-ui/icons/Collections'

import { Card, CardHeader, Grid, Typography, TextField, CardMedia, Button } from '@material-ui/core'

import RegionForm from '@components/RegionForm/RegionForm'


const ClientForm = (props) => {
  const { 
    classes, 
    formChangeHandler,
    id_perusahaan,  
    nama_perusahaan,
    nomor_telepon,
    email,
    alamat,
    iconURL,
    iconChooserHandler,
    iconChooserInput,
    iconChangeHandler,
    parentUpdater,
    provinsi,
    kota,
    kecamatan,
    kelurahan
  } = props

  const readOnly = props.readOnly ? true : false

  const defaultImage = 'http://calgarypma.ca/wp-content/uploads/2018/01/default-thumbnail-300x225.jpg'

  const iconPreviewURL = iconURL === '' ? defaultImage :  iconURL
  const iconClassName = iconURL === '' ? classes.iconHide :  classes.iconShow

  return (
    <Grid container spacing={24} alignItems="flex-start" direction="row" justify="space-between">
      <Grid item xs={12} sm={6}>
        <Grid item xs={6} sm={6}>
          <Typography align='left' className={classes.headline} variant='h5' gutterBottom>
            Data Perusahaan
          </Typography>
        </Grid>
        <TextField
          disabled={readOnly}
          id="id_perusahaan"
          name="id_perusahaan"
          onChange={(event) => formChangeHandler(event)}
          label="ID Perusahaan"
          value={id_perusahaan}
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
          InputProps={{
            classes: {
              disabled: classes.viewOnly
            }
          }}
        />

        <TextField
          disabled={readOnly}
          id="nama_perusahaan"
          name="nama_perusahaan"
          onChange={(event) => formChangeHandler(event)}
          label="Nama Perusahaan"
          value={nama_perusahaan}
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
          InputProps={{
            classes: {
              disabled: classes.viewOnly
            }
          }}
        />

        <TextField
          disabled={readOnly}
          type="number"
          id="nomor_telepon"
          name="nomor_telepon"
          onChange={(event) => formChangeHandler(event)}
          label="Nomor Telepon"
          value={nomor_telepon}
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
          InputProps={{
            classes: {
              disabled: classes.viewOnly
            }
          }}
        />

        <TextField
          disabled={readOnly}
          id="email"
          name="email"
          onChange={(event) => formChangeHandler(event)}
          label="Email"
          value={email}
          className={classes.textField}
          margin="normal"
          fullWidth
          variant="outlined"
          InputProps={{
            classes: {
              disabled: classes.viewOnly
            }
          }}
        />

        <Grid item xs={6} sm={6}>
          <Typography align='left' className={classes.headline} variant='h5' gutterBottom>Alamat Perusahaan</Typography>
        </Grid>

        <RegionForm  parentUpdater={parentUpdater} lastData={{
          provinsi: provinsi,
          kota: kota,
          kecamatan: kecamatan,
          kelurahan: kelurahan
        }}
        readOnly={readOnly}
        />

        <TextField
          disabled={readOnly}
          id="alamat"
          name="alamat"
          onChange={(event) => formChangeHandler(event)}
          label="Alamat"
          value={alamat}
          className={classes.textField}
          margin="normal"
          fullWidth
          multiline={true}
          rows={3}
          rowsMax={5}
          variant="outlined"
          InputProps={{
            classes: {
              disabled: classes.viewOnly
            }
          }}
        />

      </Grid>

      <Grid item  xs={12} sm={6} className="text-sm-left text-xs-left">
        <Card className={classes.card}>
          <div className={classes.headerWrap}>
            <CardHeader className={classes.title} title="Icon" subheader="Icon Perusahaan" />
            {
              !readOnly ? 
                <div className={classes.headerAction}>
                  <Button onClick={iconChooserHandler} name="iconchooser" variant="contained" color="primary" className={classes.button}>
                              Pilih Icon 
                    <CollectionsIcon className={classes.extendedIcon} />
                  </Button>
                  <input onChange={iconChangeHandler} ref={iconChooserInput} id="iconchooser_input" name="iconchooser_input" className={classes.InputFile} type="file"/>
                </div>
                : null
            }
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
              
  )
}

ClientForm.propTypes = {
  classes: PropTypes.object,
  formChangeHandler: PropTypes.func,
  id_perusahaan: PropTypes.string,
  nama_perusahaan: PropTypes.string,
  nomor_telepon: PropTypes.any,
  email: PropTypes.string,
  provinsi: PropTypes.string,
  kota: PropTypes.string,
  kecamatan: PropTypes.string,
  kelurahan: PropTypes.string,
  alamat: PropTypes.string,
  iconURL: PropTypes.string,
  iconChangeHandler: PropTypes.func,
  iconChooserHandler: PropTypes.func,
  iconChooserInput: PropTypes.any,
  readOnly: PropTypes.bool,
  parentUpdater: PropTypes.func
}

export default ClientForm