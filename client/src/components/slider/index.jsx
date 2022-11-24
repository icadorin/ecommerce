import React from 'react';
import Container from '../container';

const Slider = ({ value, handleChange, min, max, step }) => {
  return (
    <Container>
      <input className='input-range'
        type='range'
        defaultValue={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    </Container>
  );
}

export default Slider;
