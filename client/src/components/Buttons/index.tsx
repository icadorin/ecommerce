import React from 'react';
import '../../assets/style.css'

interface Props {
  css?: string,
  onClick: () => void,
  children: React.ReactNode
}

const Button: React.FC<Props> = ({
    css,
    onClick,
    children
  }) => {
  return (
    <button
      id='button'
      className={css}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
