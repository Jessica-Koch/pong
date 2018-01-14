import React, { Component } from 'react';
import { add, multiply } from 'ramda';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import { Loop } from '../utils/Loop';
import './Game.css';
// import { emToPx } from '../utils/emToPx';
// import { getSizeOfEms } from '../utils/getSizeOfEms';

const windowWidth = window.innerWidth;

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
      console.log(tick);
      this.setState({
        ballX: multiply(add(this.state.ballX, 5), tick),
      });
      this.forceUpdate();
    });
  }

  render() {
    const { ballX, ballY } = this.state;
    return (
      <div className="Game">
        <Paddle x={0.25} y={this.state.p1Y} r="auto" position="left" />
        <PongBall x={ballX} y={ballY} />
        <Paddle x="auto" y={this.state.p2Y} r={windowWidth + 0.5} position="right" />
      </div>
    );
  }
}
export default Game;
