import React, { Fragment } from 'react'
import PaginationHead from './PaginationHead'
import PaginationBody from './PaginationBody'
import { Table, TablePagination } from '@material-ui/core';

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data || [],
      showedData: props.data || [],
      rowsPerPage: props.rowsPerPage || 10,
      page: props.page || 0,
      order: props.order || 'asc',
      orderBy: props.orderBy,
      selected: [],
      rows: props.rows
    }

    this.handleRequestSort = this.handleRequestSort.bind(this)
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidUpdate() {
    if (this.props.data !== undefined && this.props.data.length > 0) {
      if (this.state.data !== this.props.data) {
        this.setState({data: this.props.data, showedData: this.props.data})
      }
    }
  }

  handleFilter(event, rowPoint) {
    let currentRows = [...this.state.rows]
    const filterObject = {}
    currentRows.forEach(row => {
      filterObject[row.key] = row.filter
      if (row.key === rowPoint) {
        filterObject[row.key] = event.target.value
        row.filter = event.target.value
      }
    });
    this.setState({ rows: currentRows })

    let showedData = [...this.state.data]
    console.log(filterObject)
    for (const key in filterObject) {
      showedData = showedData.filter(function(item) {
        return `${item[key]}`.toLocaleLowerCase().includes(`${filterObject[key]}`.toLocaleLowerCase());
      })
    }

    this.setState({showedData: showedData})
  }

  handleRequestSort(event, property) {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  render() {
    const { classes } = this.props
    const { showedData } = this.state
    return (
      <Fragment>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <PaginationHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={showedData.length}
              rows={this.state.rows}
            />
            <PaginationBody
              filterHandler={this.handleFilter}
              headerRows={this.state.rows}
              data={showedData}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              order={this.state.order}
              orderBy={this.state.orderBy}
              selected={this.state.selected}
              handleClick={this.handleClick}
             />
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={showedData.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Fragment>
    )
  }
}

export default Pagination