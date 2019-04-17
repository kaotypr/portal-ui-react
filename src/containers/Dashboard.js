import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppContext, Workspace, Header, Sidebar, NotificationCenter } from '../components';
import DashboardStyles from '../styles/Dashboard';
import { MobileBreakpoint } from '../styles/variables';
import routes from '../routes';

function resizeDispatch () {
  if (typeof(Event) === 'function') {
    window.dispatchEvent(new Event('resize'));
  } else {
    const evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  }
}

class Dashboard extends Component {
  state = {
    opened: true,
    notificationsOpen: false,
    type: 'light',
    direction: 'ltr',
    openSpeedDial: false
  };

  mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  handleDrawerToggle = () => {
    this.setState({ opened: !this.state.opened });
    resizeDispatch()
  };

  handleNotificationToggle = () => {
    this.setState({ notificationsOpen: !this.state.notificationsOpen });
  }

  handleFullscreenToggle = () => {
    const element = document.querySelector('#root');
    const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  }

  handleSpeedDialOpen = () => {
    this.setState({ openSpeedDial: true });
  };

  handleSpeedDialClose = () => {
    this.setState({ openSpeedDial: false });
  };

  componentDidMount() {
    if (this.mediaMatcher.matches) this.setState({ opened: false });

    this.mediaMatcher.addListener(match => {
      setTimeout(() => {
        if(match.matches) {
          this.setState({ opened: false })
        } else {
          this.setState({ opened: true })
        }
      }, 300)
    })

    this.unlisten = this.props.history.listen(() => {
      if(this.mediaMatcher.matches) this.setState({ opened: false });
      document.querySelector('#root > div > main').scrollTop = 0;
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.mediaMatcher.removeListener(match => {
      setTimeout(() => {
        if(match.matches) {
          this.setState({ opened: false })
        } else {
          this.setState({ opened: true })
        }
      }, 300)
    });
  }

  render() {
    const { classes, userAccessRoutes, username } = this.props;
    const { opened, notificationsOpen, openSpeedDial } = this.state;
    let filteredRoutes = []
    userAccessRoutes.forEach(allowed => {
      const selection = routes.items.find(perroutes => perroutes.path === allowed.path)
      if (selection !== undefined) {
        filteredRoutes.push(selection)
      }
      const selectionchildren = []
      if ((allowed.nested === true && allowed["childs"] !== undefined) && selection["children"] !== undefined) {
        allowed.childs.forEach(allowedchild => {
          let foundchild = selection.children.find(perchildroutes => perchildroutes.path === allowedchild.path)
          if (foundchild !== undefined) {
            selectionchildren.push(foundchild)
          }
        });
        selection["children"] = selectionchildren
      }
    });
    console.log(username)
    const getRoutes = (
      <Switch>
        { filteredRoutes.map((item, index) => (
            item.type === 'external' ? <Route exact path={item.path} component={item.component} name={item.name} key={index} />:
            item.type === 'submenu' ? item.children.map(subItem => <Route exact path={`${item.path}${subItem.path}`} component={subItem.component} name={subItem.name} />):
            <Route exact path={item.path} component={item.component} name={item.name} key={index} />
          ))
        }
        <Redirect to="/404" />
      </Switch>
    )

    return (
      <Fragment>
        <Header
          logoAltText="KYC Portal"
          logo={`/static/images/logo.png`}
          toggleDrawer={this.handleDrawerToggle}
          toogleNotifications={this.handleNotificationToggle}
          toggleFullscreen={this.handleFullscreenToggle}
        />
        <div className={classNames(classes.panel, 'theme-dark')}>
          <Sidebar
            routes={filteredRoutes}
            opened={opened}
            toggleDrawer={this.handleDrawerToggle}
          />
          <Workspace opened={opened}>
            {getRoutes}
          </Workspace>
          <NotificationCenter
            notificationsOpen={notificationsOpen}
            toogleNotifications={this.handleNotificationToggle}
          />
        </div>

        <Hidden xsDown>
          <AppContext.Consumer>
            {(context) => (
              <SpeedDial
                ariaLabel="Settings"
                className={classes.speedDial}
                icon={<SpeedDialIcon icon={<SettingsIcon />} />}
                onBlur={this.handleSpeedDialClose}
                onClick={this.handleClick}
                onClose={this.handleSpeedDialClose}
                onFocus={this.handleSpeedDialOpen}
                onMouseEnter={this.handleSpeedDialOpen}
                onMouseLeave={this.handleSpeedDialClose}
                open={openSpeedDial}
              >
                <SpeedDialAction
                  icon={<WbSunnyIcon />}
                  tooltipTitle="Toggle light/dark theme"
                  onClick={context.toggleTheme}
                />
                <SpeedDialAction
                  icon={context.state.direction === 'rtl' ? <FormatTextdirectionLToRIcon /> : <FormatTextdirectionRToLIcon />}
                  tooltipTitle="Toggle LTR/RTL direction"
                  onClick={context.toggleDirection}
                />
              </SpeedDial>
            )}
          </AppContext.Consumer>
        </Hidden>
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    userAccessRoutes: state.user.accessRoutes,
    username: state.user.name,
  }
}

const swrapped_with_styles = withStyles(DashboardStyles)(Dashboard);
const wrapped_connect_app = connect(mapStateToProps)(swrapped_with_styles)
const wrapped_withRouter_app = withRouter(wrapped_connect_app)

export default wrapped_withRouter_app