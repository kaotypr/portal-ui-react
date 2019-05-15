import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow, TableHead, Tooltip, TableSortLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

class PaginationHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { order, orderBy } = this.props
    const { rows } = this.props
    return (
      <TableHead>
        <TableRow>
          {/* <CustomTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </CustomTableCell> */}
          {rows.map(
            row => (
              <CustomTableCell
                key={row.key}
                align="left"
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.key ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.key}
                    direction={order}
                    onClick={this.createSortHandler(row.key)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            ),
            this,
          )}
          <CustomTableCell align="center" padding="default">
            Detail
          </CustomTableCell>
        </TableRow>
      </TableHead>
    )
  }
}

PaginationHead.propTypes = {
  onRequestSort: PropTypes.func,
  order: PropTypes.bool,
  orderBy: PropTypes.any,
  rows: PropTypes.array 
}

export default PaginationHead