import React from 'react'
import { Link } from 'react-router-dom'
import ReactJson from 'react-json-view'

import BackSpaceIcon from '@material-ui/icons/Backspace'
import { withStyles, Button, TextField, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core'

import axios from '@root/axios.instances'
import { clog } from '@utils/utility'

const styles = {
  root: {
    padding: '8px',
  },
  header: {
    padding: '15px'
  },
  headerContent: {
    padding: '15px'
  },
  viewOnly: {
    color: '#2d2a2a'
  },
  cardItems: {
    backgroundColor: '#f3f3f3',
    borderRadius: '15px',
    padding: '15px'
  }
}

class DetailOcr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trace_number: '',
      id_perusahaan: '',
      nama_client: '',
      created_at: '',
      status: '',
      request: {},
      response: {},
      detail: {},
      headers: '',
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    axios.get(`/ocrlog/${id}`)
      .then(response => {
        const { data, status } = response
        if (status === 200) {
          // let nextState = { ...this.state }
          const { client, ocr_result, token, status: status_ocr } = data
          this.setState({
            trace_number: token,
            id_perusahaan: client.id_perusahaan,
            nama_client: client.nama,
            created_at: client.created_at,
            status: status_ocr === 1 ? 'SUKSES' : 'GAGAL',
            request: {...response.request},
            response: ocr_result,
            detail: data
          })
        }
      })
      .catch(err => {
        clog('Error response', err)
      })
  }

  render() {
    const { response, request, id_perusahaan, nama_client, created_at, detail } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card square className={classes.cardwrapper}>
          <CardHeader
            classes={{
              title: classes.title,
              root: classes.header,
              content: classes.headerContent
            }}
            title="Detail OCR Log"
            subheader="Detail OCR Log"
          />
          <CardContent>
            <Grid container spacing={24} alignItems="flex-start" direction="row" justify="flex-start" style={{padding: '15px'}}>
              <Grid item sm={12} md={6} lg={6}>
                <TextField
                  disabled={true}
                  id="trace_number"
                  name="trace_number"
                  label="Trace Number"
                  value={''}
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
                  disabled={true}
                  id="id_perusahaan"
                  name="id_perusahaan"
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
                  disabled={true}
                  id="nama_client"
                  name="nama_client"
                  label="Nama Client"
                  value={nama_client}
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
                  disabled={true}
                  id="created_at"
                  name="created_at"
                  label="Created Date"
                  value={created_at}
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
              </Grid>
              <Grid item lg={6} md={6} sm={false}></Grid>
              <Grid item lg={12} md={12} sm={12}>
                <Card square className={classes.cardItems}>
                  <CardHeader
                    classes={{
                      title: classes.title,
                    }}
                    title="Request"
                  />
                  <Divider/>
                  <CardContent>
                    <ReactJson src={request} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <Card square className={classes.cardItems}>
                  <CardHeader
                    classes={{
                      title: classes.title,
                    }}
                    title="Response"
                  />
                  <Divider/>
                  <CardContent>
                    <ReactJson src={response} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <Card square className={classes.cardItems}>
                  <CardHeader
                    classes={{
                      title: classes.title,
                    }}
                    title="Detail"
                  />
                  <Divider/>
                  <CardContent>
                    <ReactJson src={detail} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
    )
  }
}

export default withStyles(styles)(DetailOcr)