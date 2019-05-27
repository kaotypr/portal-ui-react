import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  'tabLabel': {
    display: 'flex',
    flexFlow: 'row-reverse'
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
})

const ClientPICForm = props => {

  const { 
    classes, 
    activeTab, 
    picData,
    handleChangeTab,
    handleAddTab,
    handleRemoveTab,
    formChangeHandler,
    disableAddTab
  } = props

  return (
    <div className={classes.root}>
      <Tabs
        value={activeTab}
        onChange={(event, value) => handleChangeTab(event, value)}
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          key={'clientTab__0'}
          component={'a'}
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected, wrapper: classes.tabLabel }}
          label={'PIC 1'}
          icon={(
            <IconButton disabled color="primary" className={classes.button} aria-label="Delete">
              <CloseIcon fontSize="small"/>
            </IconButton>
          )}
        />
        {picData.map((clientData, index) => { 
          if (index > 0) {
            return (
              <Tab
                key={`clientTab__${index}`}
                component={'a'}
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected, wrapper: classes.tabLabel }}
                label={`PIC ${(index + 1)}`}
                icon={ (
                  <IconButton onClick={() => handleRemoveTab(index)} color="primary" className={classes.button} aria-label="Delete">
                    <CloseIcon fontSize="small"/>
                  </IconButton>
                )}
              />)
          }
        })}
        <IconButton disabled={disableAddTab} onClick={() => handleAddTab()} color="primary" className={classes.button} aria-label="Delete">
          <AddBoxIcon />
        </IconButton>
      </Tabs>
      <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} sm={6}>
          <TextField
            id="nama_pic"
            name="nama_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Nama PIC"
            value={picData[activeTab] ? picData[activeTab].nama_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="nomor_telepon_pic"
            name="nomor_telepon_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Nomor Telepon PIC"
            value={picData[activeTab] ? picData[activeTab].nomor_telepon_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="email_pic"
            name="email_pic"
            type="email"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Email PIC"
            value={picData[activeTab] ? picData[activeTab].email_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Typography align='center' style={{marginTop: '0.5em'}} className={classes.headline} variant='h5' gutterBottom>
              Alamat PIC
          </Typography>
          <TextField
            id="provinsi_pic"
            name="provinsi_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Provinsi"
            value={picData[activeTab] ? picData[activeTab].provinsi_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="kota_pic"
            name="kota_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Kota"
            value={picData[activeTab] ? picData[activeTab].kota_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="kecamatan_pic"
            name="kecamatan_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Kecamatan"
            value={picData[activeTab] ? picData[activeTab].kecamatan_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="kelurahan_pic"
            name="kelurahan_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Kelurahan"
            value={picData[activeTab] ? picData[activeTab].kelurahan_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Grid container spacing={16}>
            <Grid item xs={6} sm={6}>
              <TextField
                id="rt_pic"
                name="rt_pic"
                onChange={(event) => formChangeHandler(event, activeTab)}
                label="Rt"
                value={picData[activeTab] ? picData[activeTab].rt_pic : ''}
                className={classes.textField}
                margin="normal"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="rw_pic"
                name="rw_pic"
                onChange={(event) => formChangeHandler(event, activeTab)}
                label="Rw"
                value={picData[activeTab] ? picData[activeTab].rw_pic : ''}
                className={classes.textField}
                margin="normal"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            id="alamat_pic"
            name="alamat_pic"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Alamat"
            value={picData[activeTab] ? picData[activeTab].alamat_pic : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            multiline={true}
            rows={3}
            rowsMax={5}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  )
}

ClientPICForm.propTypes = {
  classes: PropTypes.object.isRequired,
  disableAddTab: PropTypes.bool.isRequired,
  activeTab: PropTypes.number.isRequired,
  picData: PropTypes.array.isRequired,
  handleChangeTab: PropTypes.func.isRequired,
  handleAddTab: PropTypes.func.isRequired,
  handleRemoveTab: PropTypes.func.isRequired,
  formChangeHandler: PropTypes.func.isRequired
}

export default withStyles(styles)(ClientPICForm)