import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "../../basic/Title";
import Button from "../../basic/Button";
import Penalty from "./penalty/Penalty";
import RentInfo from "./RentInfo";
import { useEffect, useState } from "react";
import RentReportModel from "../model/RentReportModel";

interface VehicleInfo {
    reportId: number;
    memberId: number;
    takeDate: string;
    returnDate: string;
    reportTime: string;
    memberName: string;
    reportImageList: {
        dashboardImg: string;
        frontImg: string;
        backImg: string;
        leftImg: string;
        rightImg: string;
    };
    vehicleNote: string;
}

export default function RentReport() {
    const navigate = useNavigate();
    const [rentData, setRentData] = useState<VehicleInfo | undefined>(undefined);

    const goStep = () => {
        navigate('/admin/vehicle-step');
    }

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchRentData = async () => {
            const res = await RentReportModel(id || '-1');
            if (res) {
                setRentData(res);
            }
        };
        fetchRentData();
    }, [id]);
    
    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            {rentData ? <RentInfo rentData={rentData} /> : <InfoContainer>보고서를 불러올 수 없습니다.</InfoContainer>}
            {rentData && <Penalty memberId={rentData.memberId}/> }
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

const InfoContainer = styled.div`
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    margin: 10px 0px;
    border-radius: 0px;
`;