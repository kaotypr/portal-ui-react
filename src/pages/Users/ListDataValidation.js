import React from 'react';
import { Card, CardContent, CardHeader, TablePagination } from '@material-ui/core';
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

const ListDataValidation = props => {
  const { classes } = props
  const component = new React.Component(props);
  component.state = {
    data: [
    ],
    rowsPerPage: 10,
    page: 0,
    order: 'asc',
    orderBy: 'calories',
    selected: []
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