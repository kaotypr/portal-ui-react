import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'

import Pagination from '@components/Paginate/Pagination'
import axios from '@root/axios.instances'
import Alert from '@components/ui/Alert'

import rows_data from './rows_data'

const styles = theme => ({
  root: {
    padding: '8px',
    maxHeight: '100%'
  },
  headerWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerAction: {
    display: 'flex',
    padding: '24px',
  },
  card: {
    padding: '8px',
    height: '100%'
  },
  title: {
    color: 'primary',
    fontSize: '20pt'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  extendedIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class ListClients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      openalert: false,
    }
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.requestData()
  }

  showAlert(title, content, options, handlers) {
    this.setState({
      openalert: true,
      alerttitle: title,
      alertcontent: content,
      firstoption: options.firstoption,
      firsthandler: handlers.firsthandler,
    })
  }

  requestData() {
    axios.get('/clients?limit=1000')
      .then(response => {
        this.setState({
          data: response.data.content
        })
      })
      .catch(error => {
        if (error.response === undefined || error.response.status === 500) {
          this.props.history.push({pathname: '/500'})
        } else {
          this.showAlert(
            'Terjadi kesalahan',
            error.response.data.error,
            { secondoption: 'Tutup' },
            { secondhandler: () => this.setState({openalert: false}) }
          )
        }
      })
  }

  render() {
    const { data } = this.state
    const { classes } = this.props
    const actionPathSetter = { detail: (id) => `${this.props.match.path}/${id}/detail` }
    const rows = rows_data
    
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
          <div className={classes.headerWrap}>
            <CardHeader
              classes={{
                title: classes.title,
              }}
              title="List Clients"
              subheader="Checking users data set"
            />
            <div className={classes.headerAction}>
              <Link to={`${this.props.match.path}/add`}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Tambah Data
                  <AddIcon className={classes.extendedIcon} />
                </Button>
              </Link>
            </div>
          </div>
          <CardContent>
            <Pagination actionPathSetter={actionPathSetter} data={data} classes={this.props.classes} rows={rows}/>
          </CardContent>
        </Card>
      </div>
    )
  }

}

ListClients.propTypes = {
  classes: PropTypes.any
}

export default withRouter(withStyles(styles)(ListClients))