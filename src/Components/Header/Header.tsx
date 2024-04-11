import { Score } from '../../assets/types';
import { Button } from '../Button/Button';
import './Header.scss';

type HeaderProps = {
  gameStarted: boolean;
  restartGame: () => void;
  score: Score;
  startGame: () => void;
};

export const Header = ({
  score,
  gameStarted,
  restartGame,
  startGame,
}: HeaderProps) => {
  return (
    <div className='Header'>
      <div className='Score'>
        <div>Player 1 Score:</div>
        <div>{score.player}</div>
      </div>
      <div className='titleBlock'>
        <h1>Welcome to Pong</h1>
        {gameStarted ? (
          <Button label='Restart Game' onClick={restartGame} />
        ) : (
          <Button label='Start Game' onClick={startGame} />
        )}
      </div>
      <div className='Score'>
        <div>Player 2 Score</div>
        <div>{score.opponent}</div>
      </div>
    </div>
  );
};
