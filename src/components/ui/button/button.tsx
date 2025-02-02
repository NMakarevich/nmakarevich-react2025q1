import React from 'react';
import './button.scss';

interface Props {
  title: string;
  handleClick: () => void;
}

function Button(props: Props): React.ReactNode {
  const { title, handleClick } = props;

  return (
    <>
      <button className={'button'} type="button" onClick={handleClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
