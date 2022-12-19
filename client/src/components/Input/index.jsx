import React from 'react';
import '../../assets/style.css'

const Input = (props) => {
  return (
    <input
      id='input'
      type={props.type}
      placeholder={props.onBlur}
      onBlur={(e) => e.target.placeholder = props.onBlur}
      onFocus={(e) => e.target.placeholder = ''}
    >
      {props.children}
    </input>
  );
}

export default Input;
