import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <Btn onClick={onClick}>
      {text}
    </Btn>
  );
};

export default Button;

const Btn = styled.div`
    background-color: #FEE500;
    width: 115px;
    height: 35px;
    text: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`;