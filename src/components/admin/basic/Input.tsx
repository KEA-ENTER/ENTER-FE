import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: React.FC<InputProps> = ({ width, ...props }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const specialCharsRegex = /[!@#$%^&*()_+=[\]{};:'"\\|,.<>/?]+/;

    if (specialCharsRegex.test(e.key) && e.key !== '-') {
      e.preventDefault();
    }
  };

  return <InputBox width={width} {...props} onKeyDown={handleKeyDown} />;
};

export default Input;

const InputBox = styled.input<InputProps>`
  border-radius: 10px;
  padding: 8px;
  border: 1px solid transparent;
  width: ${(props) => props.width || '100%'};
  outline: none;

  &:focus {
    border: 1px solid #686868;
  }
`;
