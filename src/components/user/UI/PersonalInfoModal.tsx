import styled from 'styled-components';

interface ModalProps {
    show: boolean; // 모달의 표시 여부
    handleClose: () => void; // 모달 닫기 함수
    children: React.ReactNode; // 모달 안에 들어갈 내용
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => {
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
