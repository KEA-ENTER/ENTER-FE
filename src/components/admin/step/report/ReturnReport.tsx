import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../../basic/Title";
import Button from "../../basic/Button";
import Penalty from "./penalty/Penalty";
import ReturnInfo from "./ReturnInfo";

export default function ReturnReport() {
    const navigate = useNavigate();

    const goStep = () => {
        navigate('/admin/vehicle-step');
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="반납 보고서" />
            <ReturnInfo />
            <Penalty />
            <ButtonContainer>
                <Button onClick={goStep} text={"목록"} />
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const ButtonContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-end;
`;