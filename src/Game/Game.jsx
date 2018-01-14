import React, { Component } from 'react';
import { add, inc, multiply, negate, subtract } from 'ramda';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import Score from '../Score';
import { Loop } from '../utils/Loop';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ballX: Math.floor(Math.random() * 29),
      ballY: Math.floor(Math.random() * 13),

      vx: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration
      vy: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration

      leftScore: 0,
      rightScore: 0,

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
        this.setState({ leftScore: inc(this.state.leftScore) });
      } else if (this.state.ballX < -70) {
        this.setState({ rightScore: inc(this.state.rightScore) });
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

  boardBoundsRight = window.innerWidth;
  render() {
    const { ballX, ballY } = this.state;
    return (
      <div className="Game">
        <Score position="left" player="1" total={this.state.leftScore} />
        <Score position="right" player="2" total={this.state.rightScore} />

        <Paddle x={5} y={this.state.p1Y} position="left" />
        <PongBall x={ballX} y={ballY} />
        <Paddle x={subtract(this.boardBoundsRight, 20)} y={this.state.p2Y} position="right" />
      </div>
    );
  }
}
export default Game;
