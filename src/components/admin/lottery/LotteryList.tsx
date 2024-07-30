import styled from 'styled-components';
import lotteryData from '../../../data/admin/lottery/lottery.json'
import { useNavigate } from 'react-router-dom';

const LotteryList: React.FC = () => {
    const navigate = useNavigate();
    const goLotteryDetail = (round: number, date: string, vehicleModel: string) => {
        navigate(`/admin/lottery/detail/${round}/${date}/${vehicleModel}`)
    }

    return (
        <Container>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>회차</TableHeader>
                        <TableHeaderDetail>인수 기간</TableHeaderDetail>
                        <TableHeaderDetail>차량 정보</TableHeaderDetail>
                        <TableHeader>신청자 수</TableHeader>
                        <TableHeader>당첨자 수</TableHeader>
                        <TableHeader>미인수자 수</TableHeader>
                        <TableHeader>경쟁률</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {lotteryData.map((item) => (
                        <TableRow key={item.id} onClick={() => goLotteryDetail(item.round, item.startDate, item.vehicleModel)}>
                            <TableCell>{item.round}회차</TableCell>
                            <TableCellDetail>{item.startDate}{" ~ "}{item.endDate}</TableCellDetail>
                            <TableCellDetail>{item.vehicleModel} - {item.vehicleNum}</TableCellDetail>
                            <TableCell>{item.applicantNum}명</TableCell>
                            <TableCell>{item.winnerNum}명</TableCell>
                            <TableCell>{item.unclaimedNum}명</TableCell>
                            <TableCell>{item.compRate}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Container>
  );
};

export default LotteryList;

// Style
const Container = styled.div`
    padding: 20px 0px;
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
        height: 60px;
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 11%;
`;

const TableHeaderDetail = styled(TableHeader)`
    width: 22.5%;
`;

const TableCell = styled.td`
    padding: 15px;
    text-align: center;
    width: 12%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;

const TableCellDetail = styled(TableCell)`
    width: 20%;
    font-size: 13px;
`;
