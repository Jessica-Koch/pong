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

      p1Y: 1 + 80,
      p2Y: 3 + 80,
    };
  }


  componentDidMount() {
    Loop((tick) => {
      this.setState({
        ballX: multiply(add(this.state.ballX, this.state.vx), tick),
      });

      // if the ball is at the right side of the screen
      if (this.state.ballX > (subtract(this.boardBoundsRight, 15))) {
        this.setState({ vx: negate(this.state.vx) }); // reverse direction of ball
      } else if (this.state.ballX < 0) {
        this.setState({ vx: negate(this.state.vx) }); // reverse direction of ball
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
