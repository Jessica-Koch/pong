import React, { Component } from 'react';
import { add, multiply, subtract } from 'ramda';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import { Loop } from '../utils/Loop';
import './Game.css';
// import { getSizeOfEms } from '../utils/getSizeOfEms';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ballX: 400,
      ballY: 50,
      vx: 50,

      p1Y: 1 + 80,
      p2Y: 3 + 80,
    };
  }


  componentDidMount() {
    Loop((tick) => {
      this.setState({
        ballX: multiply(add(this.state.ballX, 5), tick),
      });

      // if the ball is at the right side of the screen
      if (this.state.ballX > (this.boardBoundsRight - 10)) {

      }
      this.forceUpdate();
    });
  }
  // boardBoundsBottom = document.querySelector('.Game').getBoundingClientRect().left;

  // boardBoundsTop = document.querySelector('.Game').getBoundingClientRect().top;
  boardBoundsRight = window.innerWidth;
  render() {
    const { ballX, ballY } = this.state;
    return (
      <div className="Game">
        <Paddle x={5} y={this.state.p1Y} position="left" />
        <PongBall x={ballX} y={ballY} />
        <Paddle x={subtract(this.boardBoundsRight, 20)} y={this.state.p2Y} position="right" />
      </div>
    );
  }
}
export default Game;
