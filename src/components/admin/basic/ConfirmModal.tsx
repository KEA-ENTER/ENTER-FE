import { SetStateAction } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ConfirmModalProps {
    title: string;
    description: string;
    onClose: (confirmed: boolean) => void;
    setIsConfirmed: React.Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, description, onClose, setIsConfirmed }) => {
    const handleFalseClose = () => {
        setIsConfirmed(false);
        onClose(true);
    }
    const handleTrueClose = () => {
        setIsConfirmed(true);
        onClose(true);
    }

    return (
        <Overlay onClick={handleFalseClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <ButtonContainer>
                    <ButtonWrapper>
                        <Button text="취소" onClick={handleFalseClose} />
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button text="확인" onClick={handleTrueClose} />
                    </ButtonWrapper>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
};

export default ConfirmModal;

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
    margin: 10px 0 10px 0;
    text-align: center;
`;

const Description = styled.div`
    font-size: 16px;
    margin: 0 0 0px 0;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;