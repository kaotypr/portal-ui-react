import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class SimpleSelect extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    })
  }

  render() {
    const { classes, menuItems, handleChange, filterValue, name, label } = this.props

    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref
          }}
          htmlFor="outlined-age-simple"
        >
          {label}
        </InputLabel>
        <Select
          value={filterValue}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={name}
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { menuItems.map(items => (<MenuItem key={items.value} value={items.value}>{items.label}</MenuItem>)) }
        </Select>
      </FormControl>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  menuItems: PropTypes.array.isRequired,
  filterValue: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
}

export default withStyles(styles)(SimpleSelect)
