import styled from "styled-components";
import DateString from "../basic/DateString";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import QuestionDetailModel from "./model/QuestionDetailModel";

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

    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        const questionIdNum = parseInt(id ?? "0");
        QuestionDetailModel(questionIdNum).then(res => {
            if (res) {
                setQuestionData(res);
            }
        });
    }, [id]);

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