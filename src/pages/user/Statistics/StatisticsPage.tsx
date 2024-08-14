import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import { useEffect, useState } from 'react';
import CompetitionData from '../../../components/user/Statistics/CompetitionData';
import WaitingData from '../../../components/user/Statistics/WaitingData';
import PercentageModel from '../../../components/user/Statistics/PercentageModel';
import useUserStore from '../../../stores/userStore';
import CompetitionGraph from '../../../components/user/Statistics/CompetitionGraph';
import WaitingGraph from '../../../components/user/Statistics/WaitingGraph';

interface Competition {
    round: number;
    competitionRate: string;
}

interface Waiting {
    round: number;
    waitingAverageNumber: string;
}

// 테스트용 임시 경쟁률
const data = [
    { round: 242, competitionRate: "23.33" },
    { round: 241, competitionRate: "12.3" },
    { round: 240, competitionRate: "33.3" },
    { round: 239, competitionRate: "1.1" },
    { round: 238, competitionRate: "2.34455" }
  ];

export default function StatisticsPage() {
    const [compData, setCompData] = useState<Competition[]>([]);  // 진짜 경쟁률
    const [waitData, setWaitData] = useState<Waiting[]>([]);  // 진짜 대기 수
    const [percentage, setPercentage] = useState("100");

    const { name } = useUserStore((state) => ({
        name: state.name,
    }));
    
    useEffect(() => {
        CompetitionData().then(res => {
            if (res) {
                setCompData(res);
            }
        });
        WaitingData().then(res => {
            if (res) {
                setWaitData(res);
            }
        });
        PercentageModel().then(res => {
            if (res) {
                const calculatePercentage = (res.scorePercentile * 100).toFixed(2);
                setPercentage(calculatePercentage);
            }
        })
    }, [name]);

    return (
        <Container>
            <Title title="통계" />
            <SubTitle subTitle={`${name}님은 상위 ${percentage}%예요`} />
            <GraphContainer>
                {compData ? <CompetitionGraph data={data} /> : <div>데이터가 없습니다.</div> }
                {waitData ? <WaitingGraph data={waitData} /> : <div>데이터가 없습니다.</div> }
            </GraphContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const GraphContainer = styled.div`
    width: 100%;
    height: 300px;
`;
