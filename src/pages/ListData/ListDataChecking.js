import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '../../components/Paginate/Pagination'
import axios from 'axios'
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

// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, nama_lengkap: name, nik: calories, email: fat, status: carbs, confidence: protein };
// }

// data: [
//   createData('Abadi Jaya', 1023912378734, 'AbadiJaya@gmail.com', 'Verified', 80),
//   createData('Bagus Kusuma', 345923782342, 'baguskum@gmail.com', 'Pending', 43),
//   createData('Ceri', 1023912378734, 'ceri009@gmail.com', 'Pending', 60),
//   createData('Hestika Wijaya', 1023912378734, 'hestwijay@gmail.com', 'Verified', 80),
//   createData('Deno Gutaga', 1023912378734, 'polariaGutaga@gmail.com', 'Verified', 81),
//   createData('Wulandari Polii', 1023912378734, 'wpolii@gmail.com', 'Pending', 86),
//   createData('Ksatria Indonesia', 1023912378734, 'kioriginal@gmail.com', 'Verified', 100),
//   createData('Putra Patinama', 1023912378734, 'putrapatinama90@gmail.com', 'Verified', 96.5),
//   createData('Ningrati ore', 1023912378734, 'nigratiore@gmail.com', 'Verified', 68.8),
//   createData('Lucy Latifah', 1023912378734, 'lusila@gmail.com', 'Verified', 83.7),
//   createData('Mohammad Iqbal', 1023912378734, 'mohiqbaliquerz@gmail.com', 'Denied', 12),
// ]

class ListDataCheking extends Component {
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
    let url = `${process.env.REACT_APP_PORTAL_API}/users`
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.get(url, config)
    .then(response => {
      this.setState({
        data: response.data.content
      })
      console.log(this.state.data, response.data.content)
    })
    .catch(error => {
      if (error.response.status === 500) {
        this.props.history.push({pathname: '/error'})
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
      { key: 'nama_lengkap', numeric: false, disablePadding: true, label: 'Name' },
      { key: 'nik', numeric: true, disablePadding: false, label: 'NIK' },
      { key: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { key: 'status', numeric: false, disablePadding: false, label: 'Status' },
      { key: 'confidence', numeric: true, disablePadding: false, label: 'Percentage' }
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
              title="Users Data"
              subheader="Validation users data set"
            />
          <CardContent>
            <Pagination data={data} classes={this.props.classes} rows={rows}/>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ListDataCheking);