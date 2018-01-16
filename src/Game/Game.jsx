import React, { Component } from 'react';
import { add, inc, multiply, negate, subtract } from 'ramda';
import { number } from 'prop-types';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import Score from '../Score';
import { Loop } from '../utils/Loop';
import './Game.css';

const gameStartHeight = (window.innerHeight / 2) - 150;
const gameWidth = window.innerWidth;
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballY: Math.floor(Math.random() * 13),
      ballX: Math.floor(window.innerWidth / 2),

      // randomly choose the direction
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

      this.computerPlayer();
      // // if the ball is at the right side of the screen
      if (this.state.ballX > (add(this.boardBoundsRight, 50))) {
        this.setState({
          vx: negate(this.state.vx),
          leftScore: inc(this.state.leftScore),
        }); // reverse direction of ball
      }

      if (this.state.ballX > (subtract(this.boardBoundsRight, 50)) && this.state.ballY > this.state.rightPaddleY && this.state.ballY < add(this.state.rightPaddleY, 150)) {
        return this.setState({
          vy: negate(this.state.vy),
          vx: negate(this.state.vx),
        });
      }

      // if ball is on the left side
      if (this.state.vx < 0 && this.state.ballX < -50) {
        this.setState({
          rightScore: inc(this.state.rightScore),
          vx: negate(this.state.vx),
        }); // reverse direction of ball
      } else
      // Hit left paddle!!
      if (this.state.vx < 0 && this.state.ballX === 20 && this.state.ballY > this.state.leftPaddleTop && this.state.ballY < this.state.leftPaddleTop + 150) {
        return this.setState({
          vy: negate(this.state.vy),
          vx: negate(this.state.vx),
        });
      }

      // if the ball is at the bottom or top of the board
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
      } else if (event.keyCode === 40 && (event.target.getBoundingClientRect().top + 150) < window.innerHeight) {
        this.setState(prevState => ({ leftPaddleTop: `${add(prevState.leftPaddleTop, 10)}` }));
      }
    }

    computerPlayer = () => {
      // if paddle moving toward us & up
      if (this.state.vx > 0 && this.state.ballY < (window.innerHeight / 2) && this.state.rightPaddleY > 0) {
        this.setState(prevState => ({ rightPaddleY: `${subtract(prevState.rightPaddleY, 10)}` }));
      }
      if (this.state.vx > 0 && this.state.ballY > (subtract(window.innerHeight, 150) / 2) && add(this.state.rightPaddleY, 150) < subtract(window.innerHeight, 150)) {
        this.setState(prevState => ({ rightPaddleY: `${add(prevState.rightPaddleY, 10)}` }));
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

        <div className="midpt" />

        <PongBall x={ballX} y={ballY} />
        <Paddle x={subtract(this.boardBoundsRight, 20)} y={this.state.rightPaddleY} position="right" />
      </div>
    );
  }
}
export default Game;
