import React, { Component } from 'react';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paddle: {
        left: {
          x: 0.25,
          y: 5,
          r: 'auto',
        },
        right: {
          x: 'auto',
          y: 7,
          r: 0.25,
        },
      },
    };
  }

  render() {
    return (
      <div className="Game">
        <Paddle paddle={this.state.paddle.left} position="left" />
        <PongBall x={1} y={2} />
        <Paddle paddle={this.state.paddle.right} position="right" />
      </div>
    );
  }
}
export default Game;
