import { useNavigate } from "react-router-dom";
import Title from "../basic/Title";
import VehicleDetailInfo from "./VehicleDetailInfo";
import VehicleDetailReport from "./VehicleDetailReport";
import Button from "../basic/Button";

const vehicleData = {
    imageUrl: "img/vehicle-step.png",
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
        navigate('/vehicle')
    }

    return(
        <div>
            <Title imageSrc="/img/car.png" title="123가 5678" />
            <VehicleDetailInfo vehicleData={vehicleData} />
            <VehicleDetailReport reportData={reportData} />
            <Button text="확인" onClick={confirmBtn} />
        </div>
    );
}