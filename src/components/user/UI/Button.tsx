import styled from 'styled-components';

interface ButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, onClick, children }) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button<{ disabled?: boolean }>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    background-color: ${(props) => (props.disabled ? '#c0c0c0' : '#ffd700')};
    color: ${(props) => (props.disabled ? '#7d7d7d' : 'black')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

    &:hover {
        background-color: ${(props) => (props.disabled ? '#c0c0c0' : '#ffc700')};
    }
`;
