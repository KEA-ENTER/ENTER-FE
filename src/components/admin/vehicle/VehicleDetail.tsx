import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../basic/Title";
import Button from "../basic/Button";
import VehicleDetailInfo from "./VehicleDetailInfo";
import VehicleDetailReport from "./VehicleDetailReport";

const vehicleData = {
    imageUrl: "https://img.khan.co.kr/news/2020/04/05/l_2020040601000443600045541.jpg",
    status: "사용 가능",
    manufacturer: "현대",
    model: "model",
    fuel: "연료",
    capacity: 5,
    registrationDate: "2023-05-01"
};

const reportData = [
    {
        id: 1,
        name: "이다현",
        date: "2024-04-04",
        contents: "차가 너무 더럽습니다"
    },
    {
        id: 2,
        name: "이다현",
        date: "2024-04-05",
        contents: "The love..."
    }
]

export default function VehicleDetail() {
    const navigate = useNavigate();

    const confirmBtn = () => {
        navigate('/admin/vehicle')
    }

    return(
        <Container>
            <Title imageSrc="/img/car.png" title="123가 5678" />
            <VehicleDetailInfo vehicleData={vehicleData} />
            <VehicleDetailReport reportData={reportData} />
            <ButtonContainer>
                <Button text="확인" onClick={confirmBtn} />
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