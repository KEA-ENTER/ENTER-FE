import { useState } from "react";
import styled from "styled-components";
import Button from "../basic/Button";
import Modal from "../basic/Modal";
import QuestionAnswerModel from "./model/QuestionAnswerModel";
import { useParams } from "react-router-dom";

export default function QuestionDetailAnswer () {
    const [errorModal, setErrorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [contentData, setContentData] = useState<string | null>(null)
    const { id } = useParams<{ id: string }>();

    const closeErrorModal = () => {
        setErrorModal(false);
    }
    
    const completeAnswer = () => {
        if (!contentData){
            setErrorModal(true);
        }
        else {
            const questionIdNum = parseInt(id ?? "0");
            QuestionAnswerModel(questionIdNum, contentData).then(res => {
                if (res) {
                    setConfirmModal(true);
                }
            });
        }
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
        setContentData(null);
    }

    return(
        <Container>
            <ContentBox onChange={(e) => setContentData(e.target.value)}/>
            <ButtonContainer>
                <Button text="확인" onClick={completeAnswer} />
            </ButtonContainer>
            {errorModal && 
                <Modal
                    title='내용을 입력하세요'
                    description='비고란에 빈 값이 존재합니다.'
                    onClose={closeErrorModal} 
                />
            }
            {confirmModal && 
                <Modal
                    title='추가되었습니다.'
                    description=''
                    onClose={closeConfirmModal} 
                />
            }
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