import styled from 'styled-components';
import React, { ChangeEvent } from 'react';

interface InputProps {
    value: number | string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, type = "text", placeholder = "" }) => {
    return (
        <StyledInput
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
        />
    );
}

export default Input;

const StyledInput = styled.input`
    width: 100%;
    font-size: 20px;
    font-weight: 200;
    border: 1px solid black;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
`;