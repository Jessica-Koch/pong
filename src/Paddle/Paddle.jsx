import React, { Component } from 'react';
import { number, oneOfType, string } from 'prop-types';
import { add } from 'ramda';
import './Paddle.css';

class Paddle extends Component {
  static propTypes = {
    x: oneOfType([string, number]).isRequired,
    y: oneOfType([string, number]).isRequired,
    r: oneOfType([string, number]).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      y: 10,
    };
  }

  movePaddle = (event) => {
    this.props.y = event.clientY;
  }

  move = (e) => {
    // if up arrow hit & top of paddle is below top header
    if (e.keyCode === 38 && e.target.getBoundingClientRect().top < 80) {
      this.setState({ y: add(e.target) });
    }

    // if down arrow hit & bottom of paddle is above bottom of page + 5
    if (e.keyCode === 40 && e.target.getBoundingClientRect().bottom > (window.innerHeight + 5)) {
      console.log('keycode 40 pressed');
      console.log('target info: ', e.target);
    }

    if (e.keyCode === 38 || e.keyCode === 40) {
      this.setState({
        y: e.target.getBoundingClientRect() / (window.innerHeight),
      });
    }
  }


  render() {
    return (
      <div
        tabIndex={0}
        onKeyDown={this.move}
        onMouseMove={this.movePaddle}
        className="Paddle"
        style={{
          width: '1em',
          height: '8em',
          position: 'absolute',
          backgroundColor: '#ffffff',
        top: `${this.state.y}em`,
        left: `${this.props.x}em`,
        right: `${this.props.r}em`,
        }}
      />
    );
  }
}

export default Paddle;
