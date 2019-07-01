import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    minWidth: 120,
  }
})

class SelectComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labelWidth: 0
    }
  }

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    })
  }

  render() {
    const { classes, menus, handleChange, value, name, label, disabled } = this.props

    return (
      <FormControl variant="outlined" className={classes.formControl} fullWidth disabled={disabled}>
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref
          }}
          htmlFor="outlined-age-simple"
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              fullWidth
              name={name}
              id={`outlined-${name}-simple`}
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { menus.map(menu => <MenuItem key={menu.key} value={menu.value}>{menu.label}</MenuItem>) }
        </Select>
      </FormControl>
    )
  }
}

SelectComponent.propTypes = {
  classes: PropTypes.any,
  menus: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool
}

export default withStyles(styles)(SelectComponent)