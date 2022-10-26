import React from 'react';

const Button = (props) => {
  return (
    <button className='button-login'>
      {props.children}
    </button>
  );
};

export default Button;
