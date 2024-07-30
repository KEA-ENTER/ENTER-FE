import { useState } from "react";
import styled from "styled-components";
import Button from "../basic/Button";
import ConfirmModal from "../basic/ConfirmModal";

export default function QuestionDetailAnswer () {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const closeModal = () => {
        setIsConfirmModalOpen(false);
    }
    
    const completeAnswer = () => {
        setIsConfirmModalOpen(true);
    };
    return(
        <Container>
            <ContentBox />
            <ButtonContainer>
                <Button text="확인" onClick={completeAnswer} />
            </ButtonContainer>
            {isConfirmModalOpen && (
                <ConfirmModal
                    title="모달 창 제목"
                    description="모달 창 설명"
                    onClose={closeModal}
                    setIsConfirmed = {setIsConfirmed}
                />
            )}
            {`리턴: ${isConfirmed}`}
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