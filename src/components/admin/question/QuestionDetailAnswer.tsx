import { useState } from "react";
import styled from "styled-components";
import Button from "../basic/Button";
import ConfirmModal from "../basic/ConfirmModal";
import Modal from "../basic/Modal";

export default function QuestionDetailAnswer () {
    const [errorModal, setErrorModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const closeAlertModal = () => {
        setAlertModal(false);
    }
    
    const completeAnswer = () => {
        setAlertModal(true);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
    }

    return(
        <Container>
            <ContentBox />
            <ButtonContainer>
                <Button text="확인" onClick={completeAnswer} />
            </ButtonContainer>
            {alertModal && (
                <ConfirmModal
                    title="모달 창 제목"
                    description="모달 창 설명"
                    onClose={closeAlertModal}
                    setIsConfirmed = {setConfirmModal}
                />
            )}
            {confirmModal && (
                <Modal 
                    title="모달 창 제목"
                    description="모달 창 설명"
                    onClose={closeConfirmModal}
                />
            )}
            {`리턴: ${confirmModal}`}
        </Container>
    );
}

const Container = styled.div`
`;

const ContentBox = styled.textarea`
    width: 100%;
    padding: 30px 40px;
    border: 1px solid #686868;
    border-radius: 10px;
    margin: 20px 0px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;