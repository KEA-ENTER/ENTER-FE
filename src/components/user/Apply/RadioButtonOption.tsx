import React from 'react';
import styled from 'styled-components';

interface RadioButtonOptionProps {
    date: {
        round: number;
        takeDate: string;
        returnDate: string;
    };
    isSelected: boolean;
    onDateChange: (date: { round: number; takeDate: string; returnDate: string }) => void;
}

const RadioButtonOption: React.FC<RadioButtonOptionProps> = ({ date, isSelected, onDateChange }) => {
    return (
        <RadioContainer>
            <RadioInput type="radio" checked={isSelected} onChange={() => onDateChange(date)} />
            <Label>{`${date.takeDate} ~ ${date.returnDate}`}</Label>
        </RadioContainer>
    );
};

export default RadioButtonOption;

const RadioContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const RadioInput = styled.input`
    margin-right: 10px;
`;

const Label = styled.label`
    font-size: 16px;
`;
