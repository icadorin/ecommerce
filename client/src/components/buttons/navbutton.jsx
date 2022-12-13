import React from 'react';
import '../../assets/style.css'

const NavButton = (props) => {
  return (
    <button className='nav-button'>
      {props.children}
    </button>
  );
}

export default NavButton;
