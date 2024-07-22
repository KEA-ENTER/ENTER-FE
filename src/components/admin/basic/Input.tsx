import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: React.FC<InputProps> = ({ width, ...props }) => {
  return <InputBox width={width} {...props} />;
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