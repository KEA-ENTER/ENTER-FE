import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';

export default function StatisticsPage() {
    return (
        <Container>
            <Title title="통계" />
            <SubTitle subTitle="강동석님의 통계입니다." />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;
