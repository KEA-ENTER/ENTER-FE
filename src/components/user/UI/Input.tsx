import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface InputProps {
    value: number | string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number'; // 타입 : text, number
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, type, placeholder = '' }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return <StyledInput value={value} onChange={handleChange} type={type} placeholder={placeholder} />;
};

export default Input;

const StyledInput = styled.input`
    width: 100%;
    height: 55px;
    font-size: 18px;
    font-weight: 200;
    border: 1px solid black;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 20px;
`;
