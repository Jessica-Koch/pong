import React, { Component } from 'react';
import { number } from 'prop-types';
import './PongBall.css';

class PongBall extends Component {
  static propTypes = {
    x: number.isRequired,
    y: number.isRequired,
  }
  style = {
    width: '1em',
    height: '1em',
    top: `${this.props.y}em`,
    left: `${this.props.x}em`,
    position: 'absolute',
    backgroundColor: 'white',
  };

  render() {
    return <div style={this.style} className="PongBall" />;
  }
}
export default PongBall;
