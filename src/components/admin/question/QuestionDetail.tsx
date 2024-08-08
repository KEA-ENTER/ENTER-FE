import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../basic/Title";
import Button from "../basic/Button";
import QuestionDetailContents from "./QuestionDetailContents";

import QuestionDetailAnswer from "./QuestionDetailAnswer";

export default function QuestionDetail() {
    const navigate = useNavigate();
    const [openAnswer, setOpenAnswer] = useState(false);

    const goQuestionPage = () => {
        navigate("/admin/question");
    };
    const changeAnswerState = () => {
        setOpenAnswer(!openAnswer);
    };

    return (
        <Container>
            <TitleStyle imageSrc="/img/headphone.png" title="문의 관리" />
            <QuestionDetailContents />
            <ButtonContainer>
                <ButtonWrapper>
                    <Button text="목록" onClick={goQuestionPage} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button text="답변 작성하기" onClick={changeAnswerState} />
                </ButtonWrapper>
            </ButtonContainer>
            {openAnswer && <QuestionDetailAnswer />}
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const TitleStyle = styled(Title)`
    margin: 10px 0px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;