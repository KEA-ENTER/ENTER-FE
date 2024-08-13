import styled from "styled-components";
import DateString from "../basic/DateString";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import QuestionDetailModel from "./model/QuestionDetailModel";

// const questionData = {
//     id: 1,
//     category: "차량 문의",
//     contentSummary: "저는 악성유저니까 빨리 답변",
//     date: "2020-02-02",
//     userName: "이다현",
//     contents:  "저는 악성유저니까 빨리 답변 부탁드려요\n\n2024년 7월 31일에 개큰 페널티를 받았습니다.\n왜 저에게 페널티가 부여됐는지 도저히 모르겠어서 문의 드립니다.\n편하신 시간에 천천하지만 신속하고 빠르게 답변 부탁드립니다."
// };

interface QuestionItem {
    name: string;
    questionContent: string;
    category: string;
    questionCreatedAt: string;
    answerContent: string;
    answerCreatedAt: string;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

export default function QuestionDetailContents () {
    const [questionData, setQuestionData] = useState<QuestionItem | undefined>(undefined);

    const query = Query();
    const questionId = query.get("id") ?? "";

    useEffect(() => {
        const questionIdNum = parseInt(questionId);
        QuestionDetailModel(questionIdNum).then(res => {
            if (res) {
                // 여기 밑에 두 줄만 수정하면 됨
                setQuestionData(res.data);
            }
        });
    }, [questionId]);

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

    const getStatusText = (state: string) => {
        if (state === 'COMPLETE')
            return '답변 완료';
        else if (state === 'WAIT')
            return '대기';
        else
            return '';
    }

    return(
        <Container>
            {questionData && (
                <>
                    <Title>
                        {`[${getCategoryText(questionData.category)}] ${questionData.questionContent.substring(0, 50)}...`}
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