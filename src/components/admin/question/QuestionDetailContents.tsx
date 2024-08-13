import styled from "styled-components";
import DateString from "../basic/DateString";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import QuestionDetailModel from "./model/QuestionDetailModel";
import Button from "../basic/Button";
import QuestionDetailAnswer from "./QuestionDetailAnswer";

interface QuestionItem {
    name: string;
    questionContent: string;
    category: string;
    questionCreatedAt: string;
    answerContent: string;
    answerCreatedAt: string;
}

export default function QuestionDetailContents () {
    const [questionData, setQuestionData] = useState<QuestionItem | undefined>(undefined);
    const { id } = useParams<{ id: string }>(); // 경로에서 id를 가져옴
    const navigate = useNavigate();
    const [openAnswer, setOpenAnswer] = useState(false);

    const goQuestionPage = () => {
        navigate("/admin/question");
    };
    const changeAnswerState = () => {
        setOpenAnswer(!openAnswer);
    };
    
    useEffect(() => {
        const questionIdNum = parseInt(id ?? "0");
        QuestionDetailModel(questionIdNum).then(res => {
            if (res) {
                setQuestionData(res);
            }
        });
    }, []);

    const getCategoryText = (category: string) => {
        if (category === 'USER')
            return '사용자';
        else if (category === 'SERVICE')
            return '서비스';
        else if (category == 'VEHICLE')
            return '차량 문의';
        else if (category == 'ETC')
            return '기타';
        else
            return '';
    }

    return(
        <Container>
            {questionData && (
                <>
                    <Title>
                        {`[${getCategoryText(questionData.category)}] ${questionData.questionContent.substring(0, 10)}...`}
                    </Title>
                    <DetailInfo>{`${DateString(questionData.questionCreatedAt)} ${questionData.name}`}</DetailInfo>
                    <ContentBox>{questionData.questionContent}</ContentBox>
                </>
            )}
            {questionData?.answerContent && (
                <>
                    <ContentBox>{questionData?.answerContent}</ContentBox>
                </>
            )}
            <ButtonContainer>
                <ButtonWrapper>
                    <Button text="목록" onClick={goQuestionPage} />
                </ButtonWrapper>
                {/* 답변이 없을 때만 답변 작성 버튼 등장 */}
                {questionData?.answerContent == null && (
                    <ButtonWrapper>
                        <Button text="답변 작성하기" onClick={changeAnswerState} />
                    </ButtonWrapper>
                )}
            </ButtonContainer>
            {openAnswer && <QuestionDetailAnswer />}
        </Container>
    );
}

const Container = styled.div`
`;

const Title = styled.div`
    font-size: 20px;
    font-style: bold;
    margin: 20px 0px;
`;

const DetailInfo = styled.div`
    font-size: 13px;
    color: #aaa;
    margin: 10px 0px;
`;

const ContentBox = styled.div`
    padding: 30px 40px;
    border: 1px solid #686868;
    border-radius: 10px;
    margin: 20px 0px;
    white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;