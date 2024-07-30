import styled from "styled-components";
import Button from "../basic/Button";

export default function QuestionDetailAnswer () {
    const completeAnswer = () => {

    };
    return(
        <Container>
            <ContentBox />
            <ButtonContainer>
                    <Button text="wkrtjddhksfy" onClick={completeAnswer} />
                </ButtonContainer>
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