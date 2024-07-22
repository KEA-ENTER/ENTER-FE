import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
  title: string;
  description: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          <Button text="확인" onClick={onClose} />
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 500px;
  height: 250px;
  border-radius: 0px;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-align: center;
`;

const Description = styled.div`
  font-size: 16px;
  margin: 0 0 40px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;