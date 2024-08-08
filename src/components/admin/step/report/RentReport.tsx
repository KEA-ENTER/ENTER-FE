import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../../basic/Title";
import Button from "../../basic/Button";
import Penalty from "./penalty/Penalty";
import ReportInfo from "./ReportInfo";

const vehicleData = {
    imageUrl: "img/vehicle-step.png",
    date: "2023-02-02",
    reportDate: "2023-05-01",
    name: "이다현",
    carLocation: "N동 지하3층 101"
};

export default function RentReport() {
    const navigate = useNavigate();

    const goStep = () => {
        navigate('/admin/vehicle-step');
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <ReportInfo vehicleInfo={vehicleData}/>
            <Penalty />
            <ButtonContainer>
                <Button onClick={goStep} text={"확인"} />
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