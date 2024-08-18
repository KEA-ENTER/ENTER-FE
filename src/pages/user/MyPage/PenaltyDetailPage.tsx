import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import panaltyDetail from '../../../API/user/panaltyDetail';
import BackButton from '../../../components/user/UI/BackButton';
import Loading from '../../../components/user/Loading';

interface PenaltyDetail {
    createdAt: string;
    etc: string;
    level: string;
    penaltyId: number;
    reason: string;
}

export default function MyPage() {
    const { penaltyId } = useParams<{ penaltyId: string }>();
    const [penaltyDetail, setPenaltyDetail] = useState<PenaltyDetail | null>(null);

    useEffect(() => {
        const fetchPenaltyDetail = async () => {
            try {
                if (penaltyId) {
                    const detailData = await panaltyDetail(penaltyId); // API 호출
                    setPenaltyDetail(detailData);
                    console.log(penaltyDetail);
                }
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchPenaltyDetail();
    }, [penaltyId]);

    if (!penaltyDetail) {
        return <Loading />; // 데이터를 가져오는 동안 로딩 표시
    }

    return (
        <Container>
            <TitleContainer>
                <BackButton />
                <Title title="페널티 내역" />
            </TitleContainer>
            <SubTitle subTitle="사용차량" />

            <SubTitle subTitle="페널티 종류" />
            <GrayBox>{penaltyDetail.level}</GrayBox>
            <SubTitle subTitle="사유" />
            <GrayBox>{penaltyDetail.reason}</GrayBox>
            <SubTitle subTitle="비고" />
            <GrayBox>{penaltyDetail.etc}</GrayBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const GrayBox = styled.div`
    background: #eeeeee;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
`;
