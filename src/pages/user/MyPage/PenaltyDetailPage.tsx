import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import panaltyDetail from '../../../API/user/panaltyDetail';
import BackButton from '../../../components/user/UI/BackButton';
import Loading from '../../../components/user/Loading';

// 페널티 상세 정보 인터페이스
interface PenaltyDetail {
    createdAt: string;
    etc: string;
    level: string;
    penaltyId: number;
    reason: string;
}

export default function MyPage() {
    const { penaltyId } = useParams<{ penaltyId: string }>(); // URL 파라미터에서 페널티 ID 가져오기
    const [penaltyDetail, setPenaltyDetail] = useState<PenaltyDetail | null>(null); // 페널티 상세 정보를 관리하는 State

    // 페널티 상세 정보를 가져오는 useEffect 훅
    useEffect(() => {
        const fetchPenaltyDetail = async () => {
            try {
                if (penaltyId) {
                    const detailData = await panaltyDetail(penaltyId); // 페널티 상세 정보 API 호출
                    setPenaltyDetail(detailData); // 가져온 데이터를 State에 저장
                }
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchPenaltyDetail(); // 데이터 가져오는 함수 호출
    }, [penaltyId]);

    if (!penaltyDetail) {
        return <Loading />;
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
