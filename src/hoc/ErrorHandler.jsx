import React from 'react';

import Modal from '@ui/Modal/Modal';
import Aux from '@hocs/Aux';

const hocErrorHandler = (WrappedComponent, axios) => {
  return class HocErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, message: null };
      this.errorConfirmHandler = this.errorConfirmHandler.bind(this);
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => request, 
        error => {
          this.setState({error: null});
          return Promise.reject(error);
        });
      this.resInterceptor = axios.interceptors.response.use(response => response, 
        error => {
          this.setState({error: error, message: error.message});
          return Promise.reject(error);
        });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmHandler() {
      this.setState({ error: null, message: null});
    }
    render() {
      return (
        <Aux>
          <Modal show={!!this.state.error} usebackdrop={true} hidehandler={this.errorConfirmHandler}>
            <strong>{this.state.message}</strong>
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  };
};

export default hocErrorHandler;