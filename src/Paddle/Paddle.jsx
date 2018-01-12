import React, { Component } from 'react';
import { number, oneOfType, string, shape } from 'prop-types';
import './Paddle.css';

const paddleShape = {
  x: number,
  y: number,
  r: oneOfType(string, number),
};
class Paddle extends Component {
  static propTypes = {
    paddle: shape(paddleShape).isRequired,
  }

  render() {
    const style = {
      width: '1em',
      height: '5em',
      position: 'absolute',
      backgroundColor: '#ffffff',
      top: `${this.props.paddle.y}em`,
      left: `${this.props.paddle.x}em`,
      right: `${this.props.paddle.r}em`,
    };

    return (
      <div className="Paddle" style={style} />
    );
  }
}

export default Paddle;
