import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';


class Callback extends Component {
  render() {
		console.log('@@@rendered callback');
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <LoadingIndicator />
      </div>
    );
  }
}

export default Callback;