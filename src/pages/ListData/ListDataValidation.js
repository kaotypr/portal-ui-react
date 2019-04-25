import React from 'react';
import { Card, CardContent, Typography, CardHeader, TablePagination } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    padding: '8px',
    height: '96%',
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

const ListDataValidation = props => {
  const { classes } = props
  const component = new React.Component(props);
  component.state = {
    data: [
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Donut', 452, 25.0, 51, 4.9),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
      createData('Honeycomb', 408, 3.2, 87, 6.5),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Jelly Bean', 375, 0.0, 94, 0.0),
      createData('KitKat', 518, 26.0, 65, 7.0),
      createData('Lollipop', 392, 0.2, 98, 0.0),
      createData('Marshmallow', 318, 0, 81, 2.0),
      createData('Nougat', 360, 19.0, 9, 37.0),
      createData('Oreo', 437, 18.0, 63, 4.0),
    ]
  }

  component.render = function() {
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
              <TablePagination 
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={component.state.data.length}
              />
          </CardContent>
        </Card>
      </div>
    )
  }

  return component
}

export default withStyles(styles)(ListDataValidation);