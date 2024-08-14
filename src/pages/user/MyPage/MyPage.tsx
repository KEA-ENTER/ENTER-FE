import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';

import participationHistory from '../../../API/user/participationHistory';
import penaltyHistory from '../../../API/user/panaltyHistory';

interface ParticipationItem {
    round: number;
    takeDate: string;
    returnDate: string;
    competitionRate: string;
    result: string;
}

interface PenaltyItem {
    createdAt: string;
    reason: string;
    level: string;
}

export default function MyPage() {
    const [participationHistoryState, setParticipationHistory] = useState<ParticipationItem[]>([]);
    const [penaltyHistoryState, setPenaltyHistory] = useState<PenaltyItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const participationData = await participationHistory();
                setParticipationHistory(participationData);

                const penaltyData = await penaltyHistory();
                console.log(penaltyData);
                setPenaltyHistory(penaltyData);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Title title="내 정보" />
            <SubTitle subTitle="추첨 참여 내역" />
            <TableContainer>
                <TableHeadContainer>
                    <TableHead>회차</TableHead>
                    <TableHead>사용시간</TableHead>
                    <TableHead>경쟁률</TableHead>
                    <TableHead>결과</TableHead>
                </TableHeadContainer>
                <ScrollableList>
                    {participationHistoryState.map((item, index) => (
                        <ListContainer key={index}>
                            <Items>{item.round}</Items>
                            <Items>{item.takeDate + ' ~ ' + item.returnDate}</Items>
                            <Items>{item.competitionRate}</Items>
                            <Items>{item.result}</Items>
                        </ListContainer>
                    ))}
                </ScrollableList>
            </TableContainer>

            <SubTitle subTitle="페널티 내역" />
            <TableContainer>
                <TableHeadContainer>
                    <TableHead>사용기간</TableHead>
                    <TableHead>사유</TableHead>
                    <TableHead>기간</TableHead>
                </TableHeadContainer>
                <ScrollableList>
                    {penaltyHistoryState.map((item, index) => (
                        <ListContainer key={index}>
                            <Items>{item.createdAt}</Items>
                            <Items>{item.reason}</Items>
                            <Items>{item.level}</Items>
                        </ListContainer>
                    ))}
                </ScrollableList>
            </TableContainer>
        </Container>
    );
}

// 스타일 컴포넌트
const Container = styled.div`
    width: 100%;
`;

const TableContainer = styled.div`
    padding: 15px;
    background-color: #fee500;
    border-radius: 8px;
`;

const TableHeadContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const TableHead = styled.div`
    font-size: 15px;
    font-weight: 700;
`;

const ScrollableList = styled.div`
    max-height: 180px; /* 대략적인 높이로 3개 항목까지만 보이도록 설정 */
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤바가 나타남 */
`;

const ListContainer = styled.div`
    margin: 10px;
    padding: 8px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
`;

const Items = styled.div`
    font-size: 12px;
`;