import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <Overlay>
            <ModalContainer>
                <Message>정말 취소할까요?</Message>
                <ButtonContainer>
                    <ModalButton onClick={onConfirm}>확인</ModalButton>
                    <ModalButton onClick={onClose}>돌아가기</ModalButton>
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
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
`;

const Message = styled.h2`
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;
