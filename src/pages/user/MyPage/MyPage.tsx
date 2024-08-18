import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import getPenaltyHistory from '../../../API/user/panaltyHistory';
import getParticipationHistory from '../../../API/user/participationHistory';
import Button from '../../../components/user/UI/Button';

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

    //데이터를 담는 state
    const [participationHistoryState, setParticipationHistory] = useState<ParticipationItem[]>([]);
    const [penaltyHistoryState, setPenaltyHistory] = useState<PenaltyItem[]>([]);

    //내역의 페이지 번호를 관리 state
    const [participationPage, setParticipationPage] = useState(0);
    const [penaltyPage, setPenaltyPage] = useState(0);

    //더 불러올 데이터가 있는지 여부
    const [participationHasMore, setParticipationHasMore] = useState(true);
    const [penaltyHasMore, setPenaltyHasMore] = useState(true);

    //로딩 상태를 관리
    const [participationLoading, setParticipationLoading] = useState(false);
    const [penaltyLoading, setPenaltyLoading] = useState(false);

    const participationObserver = useRef<IntersectionObserver | null>(null);
    const penaltyObserver = useRef<IntersectionObserver | null>(null);

    const lastParticipationElementRef = useRef<HTMLDivElement>(null);
    const lastPenaltyElementRef = useRef<HTMLDivElement>(null);

    const navigateToDetailPage = (penaltyId: number) => {
        navigate(`/penalty/${penaltyId}`);
    };

    const setupObserver = (
        observerRef: React.MutableRefObject<IntersectionObserver | null>,
        ref: React.RefObject<HTMLDivElement>,
        setPage: React.Dispatch<React.SetStateAction<number>>,
        hasMore: boolean,
        loading: boolean,
    ) => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (ref.current) {
            observerRef.current.observe(ref.current);
        }
    };

    const logoutHandler = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('autoRoutingPage');
        sessionStorage.removeItem('userName');

        window.location.reload();
    };

    useEffect(() => {
        const fetchParticipationHistory = async () => {
            setParticipationLoading(true);
            try {
                const participationData = await getParticipationHistory(participationPage);
                console.log(participationData);
                setParticipationHistory((prev) => [...prev, ...participationData.lotteryListInfos]);
                setParticipationHasMore(participationData.lotteryListInfos.length > 0);
                setParticipationLoading(false);
            } catch (error) {
                console.error('참여 내역을 가져오는 데 실패했습니다:', error);
                setParticipationLoading(false);
            }
        };
        fetchParticipationHistory();
    }, [participationPage]);

    useEffect(() => {
        const fetchPenalties = async () => {
            setPenaltyLoading(true);
            try {
                const penaltyData = await getPenaltyHistory(penaltyPage);
                console.log('penaltyData', penaltyData);
                setPenaltyHistory((prev) => [...prev, ...penaltyData.penaltyList]);
                setPenaltyHasMore(penaltyData.penaltyList.length > 0);
                setPenaltyLoading(false);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
                setPenaltyLoading(false);
            }
        };
        fetchPenalties();
    }, [penaltyPage]);

    useEffect(() => {
        setupObserver(
            participationObserver,
            lastParticipationElementRef,
            setParticipationPage,
            participationHasMore,
            participationLoading,
        );
    }, [participationLoading, participationHasMore]);

    useEffect(() => {
        setupObserver(penaltyObserver, lastPenaltyElementRef, setPenaltyPage, penaltyHasMore, penaltyLoading);
    }, [penaltyLoading, penaltyHasMore]);

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
                    {participationHistoryState.map((item, index) => {
                        if (index === participationHistoryState.length - 1) {
                            return (
                                <ListContainer key={index} ref={lastParticipationElementRef}>
                                    <Items>{item.round}</Items>
                                    <Items>{item.takeDate + ' ~ ' + item.returnDate}</Items>
                                    <Items>1 : {item.competitionRate}</Items>
                                    <Items>{item.result}</Items>
                                </ListContainer>
                            );
                        } else {
                            return (
                                <ListContainer key={index}>
                                    <Items>{item.round}</Items>
                                    <Items>{item.takeDate + ' ~ ' + item.returnDate}</Items>
                                    <Items>1 : {item.competitionRate}</Items>
                                    <Items>{item.result}</Items>
                                </ListContainer>
                            );
                        }
                    })}
                </ScrollableList>
            </TableContainer>

            <SubTitle subTitle="페널티 내역" />
            <TableContainer>
                <TableHeadContainer>
                    <TableHead>페널티 생성일</TableHead>
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
            <BottonContainer>
                <Button onClick={logoutHandler}>로그아웃</Button>
            </BottonContainer>
        </Container>
    );
}

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

const BottonContainer = styled.div`
    width: 100%;
    text-align: center;
`;
