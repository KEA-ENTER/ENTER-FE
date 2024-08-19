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
    margin: 10px;
    padding: 13px 23px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    background-color: ${(props) => (props.disabled ? '#c0c0c0' : '#FEE500')};
    color: ${(props) => (props.disabled ? '#7d7d7d' : 'black')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

    &:hover {
        background-color: ${(props) => (props.disabled ? '#c0c0c0' : '#FFC700')};
    }
`;
