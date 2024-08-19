import styled from 'styled-components';

const CheckBoxOption: React.FC<{
    date: string;
    isSelected: boolean;
    onDateChange: (date: string) => void;
}> = ({ date, isSelected, onDateChange }) => {
    return (
        <CheckBox onClick={() => onDateChange(date)} $isSelected={isSelected}>
            <StyledInput type="checkbox" checked={isSelected} onChange={() => onDateChange(date)} />
            <StyledLabel>{date}</StyledLabel>
        </CheckBox>
    );
};

export default CheckBoxOption;

interface CheckBoxProps {
    $isSelected: boolean;
}

const CheckBox = styled.div<CheckBoxProps>`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 55px;
    border: ${({ $isSelected }) => ($isSelected ? '2px' : '1px')} solid
        ${({ $isSelected }) => ($isSelected ? '#FEE500' : 'black')};
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;

const StyledInput = styled.input`
    margin: 5px;
    font-size: 55px;
`;

const StyledLabel = styled.label`
    margin: 5px;
    font-size: 16px;
    color: black;
`;
