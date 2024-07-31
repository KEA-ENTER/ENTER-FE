import styled from "styled-components";
import DateString from "../basic/DateString";

const questionData = {
    id: 1,
    category: "차량 문의",
    contentSummary: "저는 악성유저니까 빨리 답변",
    date: "2020-02-02",
    userName: "이다현",
    contents:  "저는 악성유저니까 빨리 답변 부탁드려요\n\n2024년 7월 31일에 개큰 페널티를 받았습니다.\n왜 저에게 페널티가 부여됐는지 도저히 모르겠어서 문의 드립니다.\n편하신 시간에 천천하지만 신속하고 빠르게 답변 부탁드립니다."
};

export default function QuestionDetailContents () {
    return(
        <Container>
            <Title>
                {`[${questionData.category}] ${questionData.contentSummary}...`}
            </Title>
            <DetailInfo>{`${DateString(questionData.date)} ${questionData.userName}`}</DetailInfo>
            <ContentBox>{questionData.contents}</ContentBox>
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