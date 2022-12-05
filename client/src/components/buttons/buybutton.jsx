import React from 'react';
import '../../assets/style.css'

const Buybutton = (props) => {
  return (
    <button className='buy-button'>
      {props.children}
    </button>
  );
}

export default Buybutton;
