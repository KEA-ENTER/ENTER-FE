import styled from "styled-components";
import Title from "../../basic/Title";
import Penalty from "./penalty/Penalty";
import ReportInfo from "./ReportInfo";
import Button from "../../basic/Button";
import { useNavigate } from "react-router-dom";

const vehicleData = {
    imageUrl: "img/vehicle-step.png",
    status: "사용 가능",
    manufacturer: "현대",
    model: "model",
    fuel: "연료",
    capacity: 5,
    registrationDate: "2023-05-01"
};

export default function RentReport() {
    const navigate = useNavigate();

    const goStep = () => {
        navigate('/vehicle-step');
    }

    return(
        <div>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <ReportInfo vehicleInfo={vehicleData}/>
            <Penalty />
            <ButtonContainer>
                <Button onClick={goStep} text={"모두 삭제"} />
            </ButtonContainer>
        </div>
    );
}

const ButtonContainer = styled.div`
    margin-top: 20px;
    margin-left: auto;
`;