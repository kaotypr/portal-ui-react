import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Pagination from '../../components/Paginate/Pagination'
import axios from '../../axios.instances'
import Alert from '../../utils/ui/Alert';

const styles = {
  root: {
    padding: '8px',
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

class ListUser extends Component {
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
    axios.get('/users?limit=1000')
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
          "Terjadi kesalahan",
          error.response.data.error,
          { secondoption: "Tutup" },
          { secondhandler: () => this.setState({openalert: false}) }
        )
      }
    })
  }

  render() {
    const { data } = this.state
    const { classes } = this.props
    const rows = [
      { key: 'nama_lengkap', numeric: false, disablePadding: false, label: 'Name', filter: '' },
      { key: 'nik', numeric: true, disablePadding: false, label: 'NIK', filter: '' },
      // { key: 'email', numeric: false, disablePadding: false, label: 'Email', filter: '' },
      { key: 'status', numeric: false, disablePadding: false, label: 'Status', filter: '' },
      { key: 'confidence', numeric: true, disablePadding: false, label: 'Percentage', filter: '' },
    ];
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
              title="List User Data"
              subheader="Cheking users data set"
            />
          <CardContent>
            <Pagination data={data} classes={this.props.classes} rows={rows}/>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(ListUser));