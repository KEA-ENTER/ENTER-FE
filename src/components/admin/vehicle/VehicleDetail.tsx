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
    const [vehicleInfo, setVehicleInfo] = useState<VehicleDetailProps | null>(null);
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

    return(
        <Container>
            { vehicleInfo && reportInfo ?
                <>
                    <Title imageSrc="/img/car.png" title={vehicleInfo.vehicleNo} />
                    <VehicleDetailInfo vehicleInfo={vehicleInfo} />
                    <VehicleDetailReport reportInfo={reportInfo} />
                </> : <ErrorContainer>차량 정보를 불러올 수 없습니다.</ErrorContainer>}
            <ButtonContainer>
                <Button text="목록" onClick={confirmBtn} />
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const ErrorContainer = styled.div`
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    margin: 10px 0px;
    border-radius: 0px;
`;

const ButtonContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-end;
`;