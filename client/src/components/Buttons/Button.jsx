import React from 'react';
import '../../assets/style.css'

const Button = (props) => {
  return (
    <button
      id='button'
      className={props.css}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
