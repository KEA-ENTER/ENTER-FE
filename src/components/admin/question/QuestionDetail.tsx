import styled from "styled-components";
import Title from "../basic/Title";
import QuestionDetailContents from "./QuestionDetailContents";

// 문의 상세 보기 페이지
export default function QuestionDetail() {
    return (
        <Container>
            <TitleStyle imageSrc="/img/headphone.png" title="문의 관리" />
            <QuestionDetailContents />
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const TitleStyle = styled(Title)`
    margin: 10px 0px;
`;