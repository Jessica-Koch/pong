import React, { Component } from 'react';
import { add, multiply, negate, subtract } from 'ramda';
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
      vx: 5,
      vy: 5,
      p1Y: 1 + 80,
      p2Y: 3 + 80,
    };
  }


  componentDidMount() {
    Loop((tick) => {
      this.setState({
        ballX: multiply(add(this.state.ballX, this.state.vx), tick),
        ballY: multiply(add(this.state.ballY, this.state.vy), tick),
      });

      // if the ball is at the right side of the screen
      if (this.state.ballX > (add(this.boardBoundsRight, 50))) {
        this.setState({ vx: negate(this.state.vx) }); // reverse direction of ball
      } else if (this.state.ballX < -70) {
        this.setState({ vx: negate(this.state.vx) }); // reverse direction of ball
      }

      // if the ball is at the bottom of the board
      if (this.state.ballY > window.innerHeight - 100) {
        this.setState({ vy: negate(this.state.vy) });
      } else if (this.state.ballY < 0) {
        this.setState({ vy: negate(this.state.vy) });
      }
      this.forceUpdate();
    });
  }
  // boardBoundsBottom = document.querySelector('.Game').getBoundingClientRect().left;

  // boardBoundsTop =
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
