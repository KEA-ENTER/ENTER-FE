import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import DateString from '../basic/DateString';
import IdString from '../basic/IdString';
import { useEffect, useState } from 'react';
import LotteryDetailListModel from './model/LotteryDetailListModel';
import Pagination from '../basic/Pagination';

interface LotteryDetailItem {
    email: string;
    name: string;
    purpose: string;
    isWinning: boolean;
    applyTime: string;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

const LotteryDetailList: React.FC = () => {
    const [lotteryDetailData, setLotteryData] = useState<LotteryDetailItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";
    const { applyRound } = useParams<{ applyRound: string }>();
   
    useEffect(() => {
        const pageNum = parseInt(page) - 1;

        LotteryDetailListModel(word, type, pageNum, applyRound).then(res => {
            if (res) {
                setLotteryData(res.applicantList); 
                setTotalPage(res.totalPages);
            }
        });
    }, [type, word, page, applyRound]);

    return (
        <Container>
            {lotteryDetailData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
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
                    <Pagination totalPages={totalPage} />
                </>
            )}
        </Container>
    );
};

export default LotteryDetailList;

const Container = styled.div`
    padding: 10px 0px 10px 0px;
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

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
    height: 48px;
`;

const TableHeader = styled.td`
    padding: 6px;
    text-align: center;
    width: 10%;
`;

const TableCell = styled.td`
    font-size: 13px;
    padding: 12px;
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;