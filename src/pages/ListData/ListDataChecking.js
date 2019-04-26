import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '../../components/Paginate/Pagination'


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

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const ListDataCheking = props => {
  const { classes } = props
  const component = new React.Component(props);
  component.state = {
    data: [
      createData('Abadi Jaya', 1023912378734, 'AbadiJaya@gmail.com', 'Verified', 80),
      createData('Bagus Kusuma', 345923782342, 'baguskum@gmail.com', 'Pending', 43),
      createData('Ceri', 1023912378734, 'ceri009@gmail.com', 'Pending', 60),
      createData('Hestika Wijaya', 1023912378734, 'hestwijay@gmail.com', 'Verified', 80),
      createData('Deno Gutaga', 1023912378734, 'polariaGutaga@gmail.com', 'Verified', 81),
      createData('Wulandari Polii', 1023912378734, 'wpolii@gmail.com', 'Pending', 86),
      createData('Ksatria Indonesia', 1023912378734, 'kioriginal@gmail.com', 'Verified', 100),
      createData('Putra Patinama', 1023912378734, 'putrapatinama90@gmail.com', 'Verified', 96.5),
      createData('Ningrati ore', 1023912378734, 'nigratiore@gmail.com', 'Verified', 68.8),
      createData('Lucy Latifah', 1023912378734, 'lusila@gmail.com', 'Verified', 83.7),
      createData('Mohammad Iqbal', 1023912378734, 'mohiqbaliquerz@gmail.com', 'Denied', 12),
      createData('Nuriwidaya Jurkam', 1023912378734, 'nuriwidjaya@gmail.com', 'Verified', 80),
    ]
  }

  component.render = function() {
    const { data } = component.state

    const rows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'nik', numeric: true, disablePadding: false, label: 'NIK' },
      { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
      { id: 'percentage', numeric: true, disablePadding: false, label: 'Percentage' },
    ];

    return (
      <div className={classes.root}>
        <Card square className={classes.card}>
          <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Users Data"
              subheader="Validation users data set"
            />
          <CardContent>
            <Pagination data={data} classes={component.props.classes} rows={rows}/>
          </CardContent>
        </Card>
      </div>
    )
  }

  return component
}

export default withStyles(styles)(ListDataCheking);