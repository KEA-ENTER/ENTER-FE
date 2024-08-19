import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import getPenaltyHistory from '../../../API/user/panaltyHistory';
import getParticipationHistory from '../../../API/user/participationHistory';
import Button from '../../../components/user/UI/Button';

// 참여 내역 아이템 인터페이스
interface ParticipationItem {
    round: number;
    takeDate: string;
    returnDate: string;
    competitionRate: number;
    result: string;
}

// 페널티 내역 아이템 인터페이스
interface PenaltyItem {
    createdAt: string;
    level: string;
    penaltyId: number;
    reason: string;
}

// MyPage 컴포넌트 정의
export default function MyPage() {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    // 참여 내역과 페널티 내역을 관리하는 state들
    const [participationHistory, setParticipationHistory] = useState<ParticipationItem[]>([]);
    const [penaltyHistory, setPenaltyHistory] = useState<PenaltyItem[]>([]);

    // 페이지 번호를 관리하는 state들
    const [participationPage, setParticipationPage] = useState(0);
    const [penaltyPage, setPenaltyPage] = useState(0);

    // 추가로 불러올 데이터가 있는지 여부를 관리하는 state들
    const [participationHasMore, setParticipationHasMore] = useState(true);
    const [penaltyHasMore, setPenaltyHasMore] = useState(true);

    // 데이터 로딩 상태를 관리하는 state들
    const [isLoading, setIsLoading] = useState({
        participation: false,
        penalty: false,
    });

    // 옵저버와 관련된 ref들
    const participationObserver = useRef<IntersectionObserver | null>(null);
    const penaltyObserver = useRef<IntersectionObserver | null>(null);

    // 마지막 요소를 참조하기 위한 ref들
    const lastParticipationElementRef = useRef<HTMLDivElement>(null);
    const lastPenaltyElementRef = useRef<HTMLDivElement>(null);

    // 페널티 상세 페이지로 이동하는 함수
    const navigateToDetailPage = (penaltyId: number) => {
        navigate(`/penalty/${penaltyId}`);
    };

    // 옵저버를 설정하는 함수
    const setupObserver = (
        observerRef: React.MutableRefObject<IntersectionObserver | null>,
        ref: React.RefObject<HTMLDivElement>,
        setPage: React.Dispatch<React.SetStateAction<number>>,
        hasMore: boolean,
        loadingKey: keyof typeof isLoading,
    ) => {
        if (isLoading[loadingKey]) return; // 로딩 중이라면 옵저버 설정 중단
        if (observerRef.current) observerRef.current.disconnect(); // 기존의 옵저버가 있다면 해제

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1); // 마지막 요소가 화면에 들어오면 페이지 증가
            }
        });

        if (ref.current) {
            observerRef.current.observe(ref.current); // 마지막 요소를 옵저버로 관찰
        }
    };

    // 로그아웃 처리 함수
    const logoutHandler = () => {
        try {
            sessionStorage.clear(); // 세션 스토리지 비우기
            navigate('/'); // 로그인 페이지로 이동
        } finally {
            window.location.reload(); // 페이지 새로고침
        }
    };

    // 참여 내역 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchParticipationHistory = async () => {
            if (!participationHasMore || isLoading.participation) return; // 더 불러올 데이터가 없거나 로딩 중이면 중단
            setIsLoading((prev) => ({ ...prev, participation: true })); // 로딩 시작
            try {
                const { lotteryListInfos } = await getParticipationHistory(participationPage); // 참여 내역 API 호출
                setParticipationHistory((prev) => [...prev, ...lotteryListInfos]); // 기존 데이터에 추가
                setParticipationHasMore(lotteryListInfos.length > 0); // 더 불러올 데이터가 있는지 여부 설정
            } catch (error) {
                console.error('참여 내역을 가져오는 데 실패했습니다:', error); // 에러 처리
            } finally {
                setIsLoading((prev) => ({ ...prev, participation: false })); // 로딩 종료
            }
        };
        fetchParticipationHistory();
    }, [participationPage]); // participationPage가 변경될 때마다 실행

    // 페널티 내역 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchPenalties = async () => {
            if (!penaltyHasMore || isLoading.penalty) return; // 더 불러올 데이터가 없거나 로딩 중이면 중단
            setIsLoading((prev) => ({ ...prev, penalty: true })); // 로딩 시작
            try {
                const { penaltyList } = await getPenaltyHistory(penaltyPage); // 페널티 내역 API 호출
                setPenaltyHistory((prev) => [...prev, ...penaltyList]); // 기존 데이터에 추가
                setPenaltyHasMore(penaltyList.length > 0); // 더 불러올 데이터가 있는지 여부 설정
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error); // 에러 처리
            } finally {
                setIsLoading((prev) => ({ ...prev, penalty: false })); // 로딩 종료
            }
        };
        fetchPenalties();
    }, [penaltyPage]); // penaltyPage가 변경될 때마다 실행

    // 옵저버 설정을 위한 useEffect (참여 내역)
    useEffect(() => {
        setupObserver(
            participationObserver,
            lastParticipationElementRef,
            setParticipationPage,
            participationHasMore,
            'participation',
        );
    }, [isLoading.participation, participationHasMore]); // 로딩 상태와 불러올 데이터 여부가 변경될 때마다 실행

    // 옵저버 설정을 위한 useEffect (페널티 내역)
    useEffect(() => {
        setupObserver(penaltyObserver, lastPenaltyElementRef, setPenaltyPage, penaltyHasMore, 'penalty');
    }, [isLoading.penalty, penaltyHasMore]); // 로딩 상태와 불러올 데이터 여부가 변경될 때마다 실행

    // 리스트를 렌더링하는 함수
    const renderList = (
        data: ParticipationItem[] | PenaltyItem[],
        ref: React.RefObject<HTMLDivElement>,
        renderItem: (item: ParticipationItem | PenaltyItem) => React.ReactNode,
        clickHandler?: (item: PenaltyItem) => void,
    ) => {
        return data.map((item, index) => {
            const isLastItem = index === data.length - 1; // 마지막 요소인지 확인
            return (
                <ListContainer
                    key={index}
                    ref={isLastItem ? ref : null} // 마지막 요소에 ref 설정
                    onClick={() => clickHandler && clickHandler(item as PenaltyItem)} // 클릭 핸들러가 있으면 실행
                >
                    {renderItem(item)} {/* 항목을 렌더링 */}
                </ListContainer>
            );
        });
    };

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
