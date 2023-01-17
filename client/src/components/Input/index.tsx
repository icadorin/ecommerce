import React from 'react';
import '../../assets/style.css'

interface Props {
  type: string,
  onBlur: string
}

const Input: React.FC<Props> = ({
  type,
  onBlur
}) => {
  return (
    <input
      id='input'
      type={type}
      placeholder={onBlur}
      onBlur={(e) => e.target.placeholder = onBlur}
      onFocus={(e) => e.target.placeholder = ''}
    />
  );
}

export default Input;
