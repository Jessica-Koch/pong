import { Score } from '../../assets/types';
import { Button } from '../Button/Button';

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
      <span className='Score'>Player 1 Score: {score.player}</span>
      <div className='titleBlock'>
        <h1>Welcome to Pong</h1>
        {gameStarted ? (
          <Button label='Restart Game' onClick={restartGame} />
        ) : (
          <Button label='Start Game' onClick={startGame} />
        )}
      </div>
      <span className='Score'>Player 2 score: {score.opponent}</span>
    </div>
  );
};
