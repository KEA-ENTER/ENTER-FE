import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import getPenaltyHistory from '../../../API/user/panaltyHistory';

interface ParticipationItem {
    round: number;
    takeDate: string;
    returnDate: string;
    competitionRate: number;
    result: string;
}

interface PenaltyItem {
    createdAt: string;
    level: string;
    penaltyId: number;
    reason: string;
}

export default function MyPage() {
    const navigate = useNavigate();

    const [participationHistoryState, setParticipationHistory] = useState<ParticipationItem[]>([
        { competitionRate: 91447, result: '미당첨', returnDate: '01-12', round: 2, takeDate: '01-11' },
        // 더미 데이터 - 실제 데이터로 교체해야 함
    ]);

    const [penaltyHistoryState, setPenaltyHistory] = useState<PenaltyItem[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastPenaltyElementRef = useRef<HTMLDivElement>(null);

    const navigateToDetailPage = (penaltyId: number) => {
        navigate(`/penalty/${penaltyId}`);
    };

    useEffect(() => {
        const fetchPenalties = async () => {
            setLoading(true);
            try {
                const penaltyData = await getPenaltyHistory(page, 10, 'createdAt');
                setPenaltyHistory((prev) => [...prev, ...penaltyData.penaltyList]);
                setHasMore(penaltyData.penaltyList.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
                setLoading(false);
            }
        };

        fetchPenalties();
    }, [page]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastPenaltyElementRef.current) {
            observer.current.observe(lastPenaltyElementRef.current);
        }
    }, [loading, hasMore]);

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
                    {penaltyHistoryState.map((item, index) => {
                        if (index === penaltyHistoryState.length - 1) {
                            return (
                                <ListContainer
                                    key={index}
                                    onClick={() => navigateToDetailPage(item.penaltyId)}
                                    ref={lastPenaltyElementRef}
                                >
                                    <Items>{item.createdAt}</Items>
                                    <Items>{item.reason}</Items>
                                    <Items>{item.level}</Items>
                                </ListContainer>
                            );
                        } else {
                            return (
                                <ListContainer key={index} onClick={() => navigateToDetailPage(item.penaltyId)}>
                                    <Items>{item.createdAt}</Items>
                                    <Items>{item.reason}</Items>
                                    <Items>{item.level}</Items>
                                </ListContainer>
                            );
                        }
                    })}
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
    max-height: 180px;
    overflow-y: auto;
`;

const ListContainer = styled.div`
    margin: 10px;
    padding: 8px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
`;

const Items = styled.div`
    font-size: 12px;
`;
