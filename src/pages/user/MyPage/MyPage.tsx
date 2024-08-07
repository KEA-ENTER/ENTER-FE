import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';

export default function MyPage() {
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
                <ListContainer>
                    <Items>24회차</Items>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>21:1</Items>
                    <Items>미당첨</Items>
                </ListContainer>
                <ListContainer>
                    <Items>24회차</Items>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>21:1</Items>
                    <Items>미당첨</Items>
                </ListContainer>
                <ListContainer>
                    <Items>24회차</Items>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>21:1</Items>
                    <Items>미당첨</Items>
                </ListContainer>
            </TableContainer>
            <SubTitle subTitle="페널티 내역" />
            <TableContainer>
                <TableHeadContainer>
                    <TableHead>사용기간</TableHead>
                    <TableHead>사유</TableHead>
                    <TableHead>기간</TableHead>
                </TableHeadContainer>
                <ListContainer>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>지연반납</Items>
                    <Items>2개월</Items>
                </ListContainer>
                <ListContainer>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>지연반납</Items>
                    <Items>2개월</Items>
                </ListContainer>
                <ListContainer>
                    <Items>24.07.31 ~ 24.08.01</Items>
                    <Items>지연반납</Items>
                    <Items>2개월</Items>
                </ListContainer>
            </TableContainer>
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
