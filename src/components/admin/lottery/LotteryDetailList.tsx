import styled from 'styled-components';
import data from '../../../data/admin/lottery/lotteryDetail.json';

const LotteryDetailList: React.FC = () => {
    return (
        <Container>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>아이디</TableHeader>
                        <TableHeader>신청자명</TableHeader>
                        <TableHeader>사용목적</TableHeader>
                        <TableHeader>결과</TableHeader>
                        <TableHeader>신청 시간</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.purpose}</TableCell>
                            <TableCell>{item.result}</TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
    </Container>
  );
};

export default LotteryDetailList;

// Style
const Container = styled.div`
    padding: 10px 0px 20px 0px;
    border-radius: 0px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
`;

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
    height: 55px;
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 10%;
`;

const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;