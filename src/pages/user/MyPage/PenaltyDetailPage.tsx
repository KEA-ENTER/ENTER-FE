import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
// import panaltyDetail from '../../../API/user/panaltyDetail'; // API 호출 주석 처리

interface PenaltyDetail {
    vehicleImage: string;
    vehicleInfo: string;
    penaltyType: string;
    reason: string;
    remarks: string;
}

export default function MyPage() {
    const { penaltyId } = useParams<{ penaltyId: string }>();
    console.log(penaltyId);
    const [penaltyDetail, setPenaltyDetail] = useState<PenaltyDetail | null>(null);

    useEffect(() => {
        const fetchPenaltyDetail = async () => {
            // API 호출 부분 주석 처리
            // try {
            //     const detailData = await panaltyDetail(1);
            //     setPenaltyDetail(detailData);
            // } catch (error) {
            //     console.error('데이터를 가져오는 데 실패했습니다:', error);
            // }

            // 임시 더미 데이터 사용
            const dummyData: PenaltyDetail = {
                vehicleImage: 'https://via.placeholder.com/300', // 임시 이미지 URL
                vehicleInfo: '2024 Toyota Camry - White, License Plate: XYZ 1234',
                penaltyType: 'Speeding',
                reason: 'Over-speeding by 50km/h on a highway',
                remarks: 'Driver fined with a $500 ticket and a 3-month suspension',
            };
            setPenaltyDetail(dummyData);
        };

        fetchPenaltyDetail();
    }, [penaltyId]);

    if (!penaltyDetail) {
        return <div>Loading...</div>; // 데이터를 가져오는 동안 로딩 표시
    }

    return (
        <Container>
            <Title title="페널티 내역" />
            <SubTitle subTitle="사용차량" />
            <VehicleBox>
                <VehicleImg src={penaltyDetail.vehicleImage} alt="차량 사진" />
                <VehicleInfo>{penaltyDetail.vehicleInfo}</VehicleInfo>
            </VehicleBox>
            <SubTitle subTitle="페널티 종류" />
            <GrayBox>{penaltyDetail.penaltyType}</GrayBox>
            <SubTitle subTitle="사유" />
            <GrayBox>{penaltyDetail.reason}</GrayBox>
            <SubTitle subTitle="비고" />
            <GrayBox>{penaltyDetail.remarks}</GrayBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const VehicleBox = styled.div`
    display: flex;
    background: #fee500;
    padding: 15px;
    border-radius: 8px;
`;

const VehicleImg = styled.img`
    width: 80px;
`;

const VehicleInfo = styled.div`
    padding: 15px;
`;

const GrayBox = styled.div`
    background: #eeeeee;
    padding: 15px;
    border-radius: 8px;
`;
