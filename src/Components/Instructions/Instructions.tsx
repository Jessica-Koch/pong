import { Button } from '../Button/Button';
import './Instructions.scss';

type InstructionsProps = {
  clickHandler: () => void;
  showInstructions: boolean;
};

export const Instructions = ({
  clickHandler,
  showInstructions,
}: InstructionsProps) => {
  return (
    <div className={`${showInstructions ? 'Instructions' : 'instr-hide'}`}>
      <h3 className='instructionsHeader'>
        Use ↑ and ↓ arrows to move the paddle.
      </h3>
      <Button label='Got It' onClick={clickHandler} />
    </div>
  );
};
