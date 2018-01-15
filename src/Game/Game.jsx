import React, { Component } from 'react';
import { add, inc, multiply, negate, pipe, subtract, tap } from 'ramda';
import { number } from 'prop-types';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import Score from '../Score';
import { Loop } from '../utils/Loop';
import './Game.css';

const gameStartHeight = (window.innerHeight / 2) - 150;

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

      leftPaddleTop: gameStartHeight,
      rightPaddleY: gameStartHeight,
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


    onKeyDown = (event) => {
      // if up arrow hit & top of paddle is below top header
      if (event.keyCode === 38 && event.target.getBoundingClientRect().top > 150) {
        this.setState(prevState => ({ leftPaddleTop: `${prevState.leftPaddleTop - 10}` }));
      } else if (event.keyCode === 40 && (event.target.getBoundingClientRect().top + 150) < 1200) {
        this.setState(prevState => ({ leftPaddleTop: `${add(prevState.leftPaddleTop, 10)}` }));
      }
    }

  boardBoundsRight = window.innerWidth;
  gameStartHeight = 600;

  render() {
    const {
      ballX, ballY, leftPaddleTop, leftScore, rightScore,
    } = this.state;
    return (
      <div className="Game">
        <Score position="left" player="1" total={leftScore} />
        {(leftScore === 11 || rightScore === 11) ?
          (
            <div className="gameOver">
              <h1 style={{ display: 'flex' }}>Game over </h1>
              <h3>Refresh page to play again</h3>
            </div>
          )
        : <h1 className="gameOver" style={{ display: 'none' }}>Game over</h1> }
        <Score position="right" player="2" total={rightScore} />

        <Paddle x={5} y={leftPaddleTop} onKeyDown={event => this.onKeyDown(event)} position="left" />
        <PongBall x={ballX} y={ballY} />
        <Paddle x={subtract(this.boardBoundsRight, 20)} y={this.state.rightPaddleY} position="right" />
      </div>
    );
  }
}
export default Game;
