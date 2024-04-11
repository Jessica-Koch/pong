import React from 'react';
import { Header } from './Components/Header/Header';
import { PongGame } from './Components/PongGame/PongGame';
import { Instructions } from './Components/Instructions/Instructions';
import './App.css';

const App = () => {
  const [showInstructions, setShowInstructions] = React.useState(true);
  const startGame = () => {
    throw new Error('Function not implemented.');
  };

  const restartGame = () => {
    throw new Error('Function not implemented.');
  };

  const closeInstructions = () => setShowInstructions(false);

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
      {showInstructions ? (
        <Instructions
          clickHandler={closeInstructions}
          showInstructions={showInstructions}
        />
      ) : (
        <PongGame />
      )}
    </div>
  );
};
export default App;
