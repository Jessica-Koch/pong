import React from 'react';
import './PongGame.scss';
export const PongGame = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div className='PongGame'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
