import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import { useEffect, useState } from 'react';
import CompetitionGraph from '../../../components/user/Statistics/CompetitionGraph';
import WaitingGraph from '../../../components/user/Statistics/WaitingGraph';
import { fetchCompetitionData, fetchWaitingData, fetchPercentage } from '../../../API/user/getStatistic';
import Loading from '../../../components/user/Loading';

interface Competition {
    round: number;
    competitionRate: string;
}

interface Waiting {
    round: number;
    waitingAverageNumber: string;
}

export default function StatisticsPage() {
    const [compData, setCompData] = useState<Competition[]>([]);
    const [percentage, setPercentage] = useState<string>('100');
    const [waitData, setWaitData] = useState<Waiting[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const name = sessionStorage.getItem('userName');

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            try {
                const percentageData = await fetchPercentage();
                setPercentage(percentageData);
            } catch (error) {
                console.error('Error fetching percentage data:', error);
            }

            try {
                const competitionData = await fetchCompetitionData();
                setCompData(competitionData);
            } catch (error) {
                console.error('Error fetching competition data:', error);
            }

            try {
                const waitingData = await fetchWaitingData();
                setWaitData(waitingData);
            } catch (error) {
                console.error('Error fetching waiting data:', error);
            } finally {
                setIsloading(false);
            }
        };

        fetchData();
    }, [name]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Title title="통계" />
            <SubTitle subTitle={`${name}님은 상위 ${percentage}%예요`} />
            <GraphContainer>
                <SubTitle subTitle="회차별 경쟁률" />

                {compData.length > 0 ? <CompetitionGraph data={compData} /> : <div>경쟁률 데이터가 없습니다.</div>}
                <SubTitle subTitle="회차별 평균 취소 비율" />
                {waitData.length > 0 ? <WaitingGraph data={waitData} /> : <div>대기 수 데이터가 없습니다.</div>}
            </GraphContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const GraphContainer = styled.div`
    width: 100%;
    height: 175px;
`;
