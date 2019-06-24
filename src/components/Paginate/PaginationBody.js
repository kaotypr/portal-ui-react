import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TableBody, TableRow, TableCell, IconButton, TextField } from '@material-ui/core'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'

import SelectsFilter from './Filters/Selects'

const PaginationBody = props => {
  const { data, rowsPerPage, page, order, orderBy, headerRows, filterHandler } = props

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
  }
  
  return (
    <TableBody>
      <TableRow
        hover
      >
        {headerRows.map(hr => {
          return (
            <TableCell 
              key={hr.key} 
              align="center"
              sortDirection={orderBy === hr.key ? order : false}
              style={{padding: '2px 10px 5px 10px'}}
            >
              {
                hr.selects !== undefined ?
                  <SelectsFilter 
                    menuItems={hr.selects} 
                    handleChange={(e) => filterHandler(e, hr.key)} 
                    filterValue={hr.filter}
                    name={hr.key}
                    label={hr.label}
                  />
                  :
                  <TextField
                    fullWidth
                    onChange={(e) => filterHandler(e, hr.key)}
                    label={`Filter ${hr.label}`}
                    id={`filter_field-${hr.key}`}
                    margin="dense"
                    value={hr.filter}
                    variant="outlined"
                  />
              }
            </TableCell>)
        })
        }
        <TableCell></TableCell>
      </TableRow>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isSelected = props.selected.indexOf(n._id) !== -1
          return (
            <TableRow
              hover
              aria-checked={isSelected}
              tabIndex={-1}
              key={n._id}
              selected={isSelected}
            >
              {
                headerRows.map(hr => {
                  return (
                    <TableCell 
                      key={hr.key} 
                      align="left"
                      padding={hr.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === hr.key ? order : false}
                    >
                      { hr.getval !== undefined ? hr.getval(n[hr.key])  : n[hr.key]}
                    </TableCell>
                  )}
                )
              }
              <TableCell 
                padding="default"
              >
                <IconButton onClick={() => {
                  props.history.push({pathname: props.actionPathSetter.detail(n._id), params: { id: n._id }})
                }}>
                  <RemoveRedEyeIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

PaginationBody.propTypes = {
  data: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  order: PropTypes.string,
  orderBy: PropTypes.any,
  headerRows: PropTypes.any,
  filterHandler: PropTypes.func,
  selected: PropTypes.any,
  actionPathSetter: PropTypes.object
}

export default withRouter(PaginationBody)