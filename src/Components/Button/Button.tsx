import './Button.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button className='Buttons' onClick={onClick}>
      {label}
    </button>
  );
};
