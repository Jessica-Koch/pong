import React, { Component } from 'react';
import { number, oneOfType, string } from 'prop-types';
import { add } from 'ramda';
import './Paddle.css';

class Paddle extends Component {
  static propTypes = {
    x: oneOfType([string, number]).isRequired,
    y: oneOfType([string, number]).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      y: props.y,
    };
  }

  // movePaddle = (event) => {
  //   this.props.y = event.clientY;
  // }

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
          width: '15px',
          height: '150px',
          position: 'absolute',
          backgroundColor: '#ffffff',
          opacity: '0.7',
        top: `${this.state.y}px`,
        left: `${this.props.x}px`,

        }}
      />
    );
  }
}

export default Paddle;
