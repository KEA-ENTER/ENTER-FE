import styled from "styled-components";
import Title from "../basic/Title";
import Button from "../basic/Button";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VehicleDetailInfo from "./VehicleDetailInfo";
import VehicleDetailReport from "./VehicleDetailReport";
import VehicleDetailModel from './model/VehicleDetailModel';


interface VehicleDetailProps {
    vehicleId: number;
    vehicleNo: string;
    company: string;
    model: string;
    seats: string;
    fuel: string;
    img: string;
    createdAt: string;
    updatedAt: string;
    state: string;
}

interface VehicleReportProps {
    names: string[];
    reportCreatedAts: string[];
    contents: string[];
}

export default function VehicleDetail() {
    const navigate = useNavigate();

    const confirmBtn = () => {
        navigate('/admin/vehicle')
    }
    const [vehicleInfo, setVehicleInfo] = useState<VehicleDetailProps>();
    const [reportInfo, setReportInfo] = useState<VehicleReportProps>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchVehicleData = async () => {
            const res = await VehicleDetailModel(id);
            if (res) {
                setVehicleInfo(res);
                setReportInfo(res);
            }
        };
        fetchVehicleData();
    }, [id]);

    if (!vehicleInfo || !reportInfo) {
        return <div>Loading...</div>;
    }

    return(
        <Container>
            <Title imageSrc="/img/car.png" title={vehicleInfo.vehicleNo} />
            <VehicleDetailInfo vehicleInfo={vehicleInfo} />
            <VehicleDetailReport reportInfo={reportInfo} />
            <ButtonContainer>
                <Button text="목록" onClick={confirmBtn} />
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