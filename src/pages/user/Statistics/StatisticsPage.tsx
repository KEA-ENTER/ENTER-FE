import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import { useEffect, useState } from 'react';
import CompetitionGraph from '../../../components/user/Statistics/CompetitionGraph';
import WaitingGraph from '../../../components/user/Statistics/WaitingGraph';
import { fetchCompetitionData, fetchCancelData, fetchPercentage } from '../../../API/user/getStatistic';
import Loading from '../../../components/user/Loading';

// 경쟁률 및 취소율 데이터 인터페이스
interface Competition {
    round: number;
    competitionRate: string;
}

interface Waiting {
    round: number;
    waitingAverageNumber: string;
}

export default function StatisticsPage() {
    const [compData, setCompData] = useState<Competition[]>([]); // 경쟁률 데이터 관리
    const [percentage, setPercentage] = useState<string>('100'); // 사용자의 상위 비율 관리
    const [cancelData, setCancelData] = useState<Waiting[]>([]); // 취소율 데이터 관리
    const [isLoading, setIsloading] = useState<boolean>(false); // 로딩 state 관리

    const name = sessionStorage.getItem('userName'); // 세션에서 사용자 이름 가져오기

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true); // 데이터 로딩 시작
            try {
                const percentageData = await fetchPercentage(); // 가산점 상위 % 데이터 가져오기
                setPercentage(percentageData);
            } catch (error) {
                console.error('Error fetching percentage data:', error); // 오류 처리
            }

            try {
                const competitionData = await fetchCompetitionData(); // 경쟁률 데이터 가져오기
                setCompData(competitionData);
            } catch (error) {
                console.error('Error fetching competition data:', error); // 오류 처리
            }

            try {
                const cancelData = await fetchCancelData(); // 취소율 데이터 가져오기
                setCancelData(cancelData);
            } catch (error) {
                console.error('Error fetching waiting data:', error); // 오류 처리
            } finally {
                setIsloading(false); // 데이터 로딩 종료
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, [name]); // name 값이 변경될 때마다 실행

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Title title="통계" />
            <SubTitle subTitle={`${name}님은 상위 ${percentage}%예요`} />
            <GraphContainer>
                <SubTitle subTitle="회차별 경쟁률" />
                {compData.length > 0 ? (
                    <CompetitionGraph data={compData} /> // 경쟁률 그래프 렌더링
                ) : (
                    <div>회차별 경쟁률 데이터가 없습니다.</div>
                )}
                <SubTitle subTitle="회차별 평균 취소 비율" />
                {cancelData.length > 0 ? (
                    <WaitingGraph data={cancelData} /> // 취소율 그래프 렌더링
                ) : (
                    <div>회차별 평균 취소 비율 데이터가 없습니다.</div>
                )}
            </GraphContainer>
        </Container>
    );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
    width: 100%;
`;

const GraphContainer = styled.div`
    width: 100%;
    height: 175px;
`;
