import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ModalBody = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CloseButton = styled.button`
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

const Modal = ({ show, handleClose, children }) => {
    if (!show) return null;

    return (
        <ModalBackground>
            <ModalContent>
                <ModalHeader>개인정보 처리 방침</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <CloseButton onClick={handleClose}>닫기</CloseButton>
                </ModalFooter>
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;
