import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import { useEffect, useState } from 'react';
import CompetitionGraph from '../../../components/user/Statistics/CompetitionGraph';
import WaitingGraph from '../../../components/user/Statistics/WaitingGraph';
import useUserStore from '../../../stores/userStore';
import { fetchCompetitionData, fetchWaitingData, fetchPercentage } from '../../../API/user/getStatistic';

interface Competition {
    round: number;
    competitionRate: string;
}

interface Waiting {
    round: number;
    waitingAverageNumber: string;
}

export default function StatisticsPage() {
    const [compData, setCompData] = useState<Competition[]>([]); // 경쟁률 데이터
    const [percentage, setPercentage] = useState<string>('100');
    const [waitData, setWaitData] = useState<Waiting[]>([]); // 대기 수 데이터

    const { name } = useUserStore((state) => ({
        name: state.name,
    }));

    useEffect(() => {
        fetchPercentage().then(setPercentage).catch(console.error);
        fetchCompetitionData().then(setCompData).catch(console.error);
        fetchWaitingData().then(setWaitData).catch(console.error);
    }, [name]);

    return (
        <Container>
            <Title title="통계" />
            <SubTitle subTitle={`${name}님은 상위 ${percentage}%예요`} />
            <GraphContainer>
                <SubTitle subTitle="회차별 경쟁률" />

                {compData.length > 0 ? <CompetitionGraph data={compData} /> : <div>경쟁률 데이터가 없습니다.</div>}
                <SubTitle subTitle="회차별 취소 수" />
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
<<<<<<< HEAD
    height: 300px;
=======
    height: 175px;
>>>>>>> develop
`;
