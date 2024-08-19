import styled from 'styled-components';
import Pagination from '../basic/Pagination';
import DateString from '../basic/DateString';
import IdString from '../basic/IdString';

interface LotteryDetailItem {
    email: string;
    name: string;
    purpose: string;
    isWinning: boolean;
    applyTime: string;
}

interface LotteryDetailProps {
    lotteryDetailData: LotteryDetailItem[];
    totalPage: number;
}

const LotteryDetailList: React.FC<LotteryDetailProps> = ({ lotteryDetailData, totalPage }) => {

    return (
        <Container>
            {lotteryDetailData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
                    <Table>
                        <thead>
                            <TableTitle>
                                <TableHeader>아이디</TableHeader>
                                <TableHeader>신청자명</TableHeader>
                                <TableHeader>사용목적</TableHeader>
                                <TableHeader>결과</TableHeader>
                                <TableHeader>신청 시간</TableHeader>
                            </TableTitle>
                        </thead>
                        <tbody>
                            {lotteryDetailData.map((item, idx) => (
                                <TableRow key={idx}>  
                                    <TableCell>{IdString(item.email)}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.purpose}</TableCell>
                                    <TableCell>{item.isWinning ? '당첨' : '미당첨'}</TableCell>                            
                                    <TableCell>{DateString(item.applyTime)}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination totalPages={totalPage} pagesPerGroup={10}/>
                </>
            )}
        </Container>
    );
};

export default LotteryDetailList;

const Container = styled.div`
    padding: 20px 0px 10px 0px;
    border-radius: 0px;
`;

const NoResultMessage = styled.div`
    padding: 20px;
    text-align: center;
    font-size: 18px;
    color: #686868;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
`;

const TableTitle = styled.tr`
    border-bottom: solid 1px #686868;
`;

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
    height: 55px;
    &:hover {
        background: rgba(220, 220, 220, 0.6);
    }
`;

const TableHeader = styled.td`
    padding: 10px;
    text-align: center;
    width: 10%;
`;

const TableCell = styled.td`
    padding: 12px;
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;