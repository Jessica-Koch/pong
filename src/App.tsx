import React from 'react';
import { Header } from './Components/Header/Header';
import { PongGame } from './Components/PongGame/PongGame';

const App = () => {
  const startGame = () => {
    throw new Error('Function not implemented.');
  };

  const restartGame = () => {
    throw new Error('Function not implemented.');
  };

  return (
    <div className='App'>
      <Header
        gameStarted={false}
        restartGame={restartGame}
        score={{
          player: 0,
          opponent: 0,
        }}
        startGame={startGame}
      />
      <PongGame />
    </div>
  );
};
export default App;
