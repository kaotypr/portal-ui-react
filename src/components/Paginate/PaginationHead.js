import React from 'react';
import { TableCell, Checkbox, TableRow, TableHead, Tooltip, TableSortLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class PaginationHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const rows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'nik', numeric: true, disablePadding: false, label: 'NIK' },
      { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
      { id: 'percentage', numeric: true, disablePadding: false, label: 'Percentage' },
    ];
    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </CustomTableCell>
          {rows.map(
            row => (
              <CustomTableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default PaginationHead