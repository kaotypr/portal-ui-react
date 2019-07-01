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

import RegionForm from '@components/RegionForm/RegionForm'

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
    disableAddTab,
    readOnly,
    parentUpdater
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
          icon={ readOnly ? null : (
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
                icon={ readOnly ? null : (
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
            id="nama"
            name="nama"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Nama PIC"
            value={picData[activeTab] ? picData[activeTab].nama : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="nomor_telepon"
            name="nomor_telepon"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Nomor Telepon PIC"
            value={picData[activeTab] ? picData[activeTab].nomor_telepon : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Email PIC"
            value={picData[activeTab] ? picData[activeTab].email : ''}
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Typography align='center' style={{marginTop: '0.5em'}} className={classes.headline} variant='h5' gutterBottom>
              Alamat PIC
          </Typography>

          <RegionForm parentUpdater={parentUpdater} multiForm={true} index={activeTab} lastData={picData[activeTab]}/>

          <Grid container spacing={16}>
            <Grid item xs={6} sm={6}>
              <TextField
                id="rt"
                name="rt"
                onChange={(event) => formChangeHandler(event, activeTab)}
                label="Rt"
                value={picData[activeTab] ? picData[activeTab].rt : ''}
                className={classes.textField}
                margin="normal"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="rw"
                name="rw"
                onChange={(event) => formChangeHandler(event, activeTab)}
                label="Rw"
                value={picData[activeTab] ? picData[activeTab].rw : ''}
                className={classes.textField}
                margin="normal"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            id="alamat"
            name="alamat"
            onChange={(event) => formChangeHandler(event, activeTab)}
            label="Alamat"
            value={picData[activeTab] ? picData[activeTab].alamat : ''}
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
  classes: PropTypes.object,
  disableAddTab: PropTypes.bool,
  activeTab: PropTypes.number,
  picData: PropTypes.array.isRequired,
  handleChangeTab: PropTypes.func,
  handleAddTab: PropTypes.func,
  handleRemoveTab: PropTypes.func,
  formChangeHandler: PropTypes.func,
  readOnly: PropTypes.bool,
  parentUpdater: PropTypes.func
}

export default withStyles(styles)(ClientPICForm)