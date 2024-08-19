import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "../../basic/Title";
import Button from "../../basic/Button";
import Penalty from "./penalty/Penalty";
import ReturnInfo from "./ReturnInfo";
import ReturnReportModel from "../../../../API/admin/step/ReturnReportModel";

interface VehicleInfo {
    reportId: number;
    memberId: number;
    takeDate: string;
    returnDate: string;
    reportTime: string;
    parkingLoc: string;
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

export default function ReturnReport() {
    const navigate = useNavigate();
    const [returnData, setReturnData] = useState<VehicleInfo | null>(null);

    const goStep = () => {
        navigate('/admin/vehicle-step');
    }

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchReturnData = async () => {
            const res = await ReturnReportModel(id || '-1');
            if (res) {
                setReturnData(res);
            } else {
                setReturnData(null);
            }
        };
        fetchReturnData();
    }, [id]);

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="반납 보고서" />
            {returnData ? <ReturnInfo returnData={returnData} /> : <InfoContainer>보고서를 불러올 수 없습니다.</InfoContainer>}
            {returnData && <Penalty memberId={returnData.memberId} /> }
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
