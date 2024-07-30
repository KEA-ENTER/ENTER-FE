import styled from "styled-components";

const questionData = {
    id: 1,
    category: "차량 문의",
    contentSummary: "안녕하세요 안녕하세요안녕하",
    date: "2020-02-02",
    userName: "이다현",
    contents: "안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
    + "안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요"
};

export default function QuestionDetailContents () {
    return(
        <Container>
            <Title>
                {`[${questionData.category}] ${questionData.contentSummary}...`}
            </Title>
            <DetailInfo>{`${questionData.date} ${questionData.userName}`}</DetailInfo>
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
`;