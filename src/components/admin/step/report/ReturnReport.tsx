import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../../basic/Title";
import Penalty from "./penalty/Penalty";
import ReportInfo from "./ReportInfo";
import Button from "../../basic/Button";

const vehicleData = {
    imageUrl: "img/vehicle-step.png",
    status: "사용 가능",
    manufacturer: "현대",
    model: "model",
    fuel: "연료",
    capacity: 5,
    registrationDate: "2023-05-01"
};

export default function ReturnReport() {
    const navigate = useNavigate();

    const goStep = () => {
        navigate('/admin/vehicle-step');
    }

    return(
        <div>
            <Title imageSrc="/img/vehicle-step.png" title="반납 보고서" />
            <ReportInfo vehicleInfo={vehicleData}/>
            <Penalty />
            <ButtonContainer>
                <Button onClick={goStep} text={"확인"} />
            </ButtonContainer>
        </div>
    );
}

const ButtonContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-end;
`;