import React from 'react';
import styles from './button.module.scss';

interface Props {
  title: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  handleClick: () => void;
}

function Button(props: Props): React.ReactNode {
  const { title, handleClick, disabled } = props;
  const type = props.type ?? 'button';

  return (
    <>
      <button
        className={styles.button}
        type={type}
        onClick={handleClick}
        disabled={disabled}
      >
        {title}
      </button>
    </>
  );
}

export default Button;
