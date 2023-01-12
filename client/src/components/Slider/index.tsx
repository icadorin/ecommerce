import React from 'react';
import Container from '../Container';

interface Props {
  value: number,
  handleChange: any,
  min: number,
  max: number,
  step: number
}

const Slider: React.FC<Props> = ({
  value,
  handleChange,
  min,
  max,
  step
}) => {
  return (
    <Container>
      <input className='input-range'
        type='range'
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    </Container>
  );
}

export default Slider;
