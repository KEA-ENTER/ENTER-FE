import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../basic/Button";
import Modal from "../basic/Modal";
import Loading from "../basic/Loading";
import QuestionAnswerModel from "../../../API/admin/question/QuestionAnswerModel";

// 문의의 답변을 작성하는 컴포넌트
export default function QuestionDetailAnswer () {
    const [errorModal, setErrorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [contentData, setContentData] = useState<string | null>(null)
    const [errorState, setErrorState] = useState("답변 내용이 존재하지 않습니다.");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // 내용이 존재하지 않을 때 띄워지는 모달을 닫는다.
    const closeErrorModal = () => {
        setErrorState("답변 내용이 존재하지 않습니다.");
        setErrorModal(false);
    }
    
    // 답변 작성을 시도한다.
    const completeAnswer = () => {
        if (!contentData){ // 내용이 존재하지 않을 때 에러 모달을 띄운다.
            setErrorModal(true);
        }
        else { // 내용이 존재한다면, 답변 작성 API가 완전히 호출될 때까지 로딩 창을 띄우며 기다린다.
            setLoading(true);
            const questionIdNum = parseInt(id ?? "0");
            QuestionAnswerModel(questionIdNum, contentData).then(res => {
                if (res) { // 작성 성공 시 확인 모달을 띄운다
                    setConfirmModal(true);
                    setLoading(false);
                } else { // API 작성 실패 시 에러 안내를 띄운다.
                    setLoading(false)
                    setErrorState("서버 오류가 발생했습니다. 다시 시도해 주세요");
                    setErrorModal(true);
                }
            });
        }
    };

    // 답변 작성 성공 시 확인 모달을 띄운다.
    const closeConfirmModal = () => {
        setConfirmModal(false);
        setContentData(null);
        navigate('/admin/question')
    }

    return(
        <Container>
            <ContentBox onChange={(e) => setContentData(e.target.value)}/>
            <ButtonContainer>
                <Button text="전송" onClick={completeAnswer} />
            </ButtonContainer>
            {errorModal && 
                <Modal
                    title='답변 작성에 실패했습니다.'
                    description={errorState}
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
            {loading && (
                <Loading />
            )}
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