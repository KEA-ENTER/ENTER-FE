import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import getPenaltyHistory from '../../../API/user/panaltyHistory';
import getParticipationHistory from '../../../API/user/participationHistory';
import Button from '../../../components/user/UI/Button';
import Loading from '../../../components/user/Loading';

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

    // 데이터 상태 관리
    const [participationHistory, setParticipationHistory] = useState<ParticipationItem[]>([]);
    const [penaltyHistory, setPenaltyHistory] = useState<PenaltyItem[]>([]);

    // 페이지 상태 관리
    const [participationPage, setParticipationPage] = useState(0);
    const [penaltyPage, setPenaltyPage] = useState(0);

    // 더 불러올 데이터 여부
    const [participationHasMore, setParticipationHasMore] = useState(true);
    const [penaltyHasMore, setPenaltyHasMore] = useState(true);

    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState({
        participation: false,
        penalty: false,
    });

    // 전체 로딩 상태
    const isOverallLoading = isLoading.participation || isLoading.penalty;

    const participationObserver = useRef<IntersectionObserver | null>(null);
    const penaltyObserver = useRef<IntersectionObserver | null>(null);

    const lastParticipationElementRef = useRef<HTMLDivElement>(null);
    const lastPenaltyElementRef = useRef<HTMLDivElement>(null);

    // 페널티 상세 페이지로 이동하는 함수
    const navigateToDetailPage = (penaltyId: number) => {
        navigate(`/penalty/${penaltyId}`);
    };

    const setupObserver = (
        observerRef: React.MutableRefObject<IntersectionObserver | null>,
        ref: React.RefObject<HTMLDivElement>,
        setPage: React.Dispatch<React.SetStateAction<number>>,
        hasMore: boolean,
        loadingKey: keyof typeof isLoading,
    ) => {
        if (isLoading[loadingKey]) return;
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
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const fetchParticipationHistory = async () => {
            if (!participationHasMore || isLoading.participation) return;
            setIsLoading((prev) => ({ ...prev, participation: true }));
            try {
                const { lotteryListInfos } = await getParticipationHistory(participationPage);
                setParticipationHistory((prev) => [...prev, ...lotteryListInfos]);
                setParticipationHasMore(lotteryListInfos.length > 0);
            } catch (error) {
                console.error('참여 내역을 가져오는 데 실패했습니다:', error);
            } finally {
                setIsLoading((prev) => ({ ...prev, participation: false }));
            }
        };
        fetchParticipationHistory();
    }, [participationPage]);

    useEffect(() => {
        const fetchPenalties = async () => {
            if (!penaltyHasMore || isLoading.penalty) return;
            setIsLoading((prev) => ({ ...prev, penalty: true }));
            try {
                const { penaltyList } = await getPenaltyHistory(penaltyPage);
                setPenaltyHistory((prev) => [...prev, ...penaltyList]);
                setPenaltyHasMore(penaltyList.length > 0);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            } finally {
                setIsLoading((prev) => ({ ...prev, penalty: false }));
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
            'participation',
        );
    }, [isLoading.participation, participationHasMore]);

    useEffect(() => {
        setupObserver(penaltyObserver, lastPenaltyElementRef, setPenaltyPage, penaltyHasMore, 'penalty');
    }, [isLoading.penalty, penaltyHasMore]);

    const renderList = (
        data: ParticipationItem[] | PenaltyItem[],
        ref: React.RefObject<HTMLDivElement>,
        renderItem: (item: ParticipationItem | PenaltyItem) => React.ReactNode,
        clickHandler?: (item: PenaltyItem) => void,
    ) => {
        return data.map((item, index) => {
            const isLastItem = index === data.length - 1;
            return (
                <ListContainer
                    key={index}
                    ref={isLastItem ? ref : null}
                    onClick={() => clickHandler && clickHandler(item as PenaltyItem)}
                >
                    {renderItem(item)}
                </ListContainer>
            );
        });
    };

    if (isOverallLoading) {
        return <Loading />;
    }

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
                    {renderList(participationHistory, lastParticipationElementRef, (item) => (
                        <>
                            <Items>{(item as ParticipationItem).round}</Items>
                            <Items>
                                {(item as ParticipationItem).takeDate + ' ~ ' + (item as ParticipationItem).returnDate}
                            </Items>
                            <Items>1 : {(item as ParticipationItem).competitionRate}</Items>
                            <Items>{(item as ParticipationItem).result}</Items>
                        </>
                    ))}
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
                    {renderList(
                        penaltyHistory,
                        lastPenaltyElementRef,
                        (item) => (
                            <>
                                <Items>{(item as PenaltyItem).createdAt}</Items>
                                <Items>{(item as PenaltyItem).reason}</Items>
                                <Items>{(item as PenaltyItem).level}</Items>
                            </>
                        ),
                        (item) => navigateToDetailPage(item.penaltyId),
                    )}
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
