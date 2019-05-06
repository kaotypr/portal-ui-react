import React from 'react'
import { withRouter } from 'react-router-dom'
import { TableBody, TableRow, TableCell, Checkbox, IconButton } from "@material-ui/core";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

const PaginationBody = props => {
  const { data, rowsPerPage, page, order, orderBy, headerRows } = props

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }
  
  return (
    <TableBody>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isSelected = props.selected.indexOf(n.id) !== -1;
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={n.id}
              selected={isSelected}
            >
              {/* <TableCell padding="checkbox">
                <Checkbox 
                  checked={isSelected}  
                  onClick={event => props.handleClick(event, n.id)} />
              </TableCell> */}
              {
                headerRows.map(hr => {
                  return (
                    
                    <TableCell 
                      key={hr.key} 
                      align="right"
                      padding={hr.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === hr.key ? order : false}
                    >
                      {n[hr.key]}
                    </TableCell>
                  )}
                )
              }
              <TableCell 
                padding="none"
              >
                <IconButton onClick={() => {
                  props.history.push({pathname: `${props.match.path}/${n.id}`, params: { id: n.id }})
                }}>
                  <RemoveRedEyeIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  )
}

export default withRouter(PaginationBody)