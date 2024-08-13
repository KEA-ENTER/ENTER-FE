import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
    title: string;
    description: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, onClose }) => {
    const handleClose =()=> {
        onClose()
        //window.location.reload();
    }
    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <ButtonContainer>
                    <Button text="확인" onClick={handleClose} />
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
    z-index: 50;
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 450px;
    height: 230px;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    margin: 30px 0 10px 0;
    text-align: center;
`;

const Description = styled.div`
    font-size: 15px;
    color: #686868;
    margin: 0 0 0px 0;
    text-align: center;
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`;