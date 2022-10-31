import React from 'react';
import '../../assets/style.css'

const NavButton = (props) => {
  return (
    <button className='login-button'>
      {props.children}
    </button>
  );
}

export default NavButton;
