import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import DateString from '../basic/DateString';
import { useEffect, useState } from 'react';
import LotteryListModel from '../../../API/admin/lottery/LotteryListModel';
import Pagination from '../basic/Pagination';

interface LotteryItem {
    applyRoundId: number;
    round: number;
    takeDate: string;
    returnDate: string;
    vehicleModel: string;
    vehicleNo: string;
    applyCnt: number;
    winningCnt: number;
    noShowCnt: number;
    competition: string;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

// 추첨 관리 페이지의 리스트
const LotteryList: React.FC = () => {
    const [lotteryData, setLotteryData] = useState<LotteryItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const navigate = useNavigate();
    
    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    // 추첨 내역 API를 호출한다.
    useEffect(() => {
        // 보여지는 페이지와 서버의 페이지 번호를 맞춘다.
        const pageNum = parseInt(page) - 1;
        LotteryListModel(word, type, pageNum).then(res => {
            if (res) {
                setLotteryData(res.lotteryList); // lotteryList 저장 (서버에서 만든 리스트 이름이 lotteryList임)
                setTotalPage(res.totalPages); // totalPages 저장 (서버에서 보내준 총 페이지 수)
            }
        });
    }, [type, word, page]);

    const goLotteryDetail = (applyRoundId: number) => {
        navigate(`/admin/lottery/detail/${applyRoundId}`)
    }

    return (
        <Container>
            {lotteryData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
                    <Table>
                        <thead>
                            <TableTitle>
                                <TableHeader>회차</TableHeader>
                                <TableHeaderDetail>인수 기간</TableHeaderDetail>
                                <TableHeaderDetail>차량 정보</TableHeaderDetail>
                                <TableHeader>신청자 수</TableHeader>
                                <TableHeader>당첨자 수</TableHeader>
                                <TableHeader>미인수자 수</TableHeader>
                                <TableHeader>경쟁률</TableHeader>
                            </TableTitle>
                        </thead>
                        <tbody>
                            {lotteryData.map((item, idx) => (
                                <TableRow key={idx} onClick={() => goLotteryDetail(item.applyRoundId)}>
                                    <TableCell>{item.round}회차</TableCell>
                                    <TableCellDetail>{DateString(item.takeDate)}{" ~ "}{DateString(item.returnDate)}</TableCellDetail>
                                    <TableCellDetail>{item.vehicleModel} - {item.vehicleNo}</TableCellDetail>
                                    <TableCell>{item.applyCnt}명</TableCell>
                                    <TableCell>{item.winningCnt}명</TableCell>
                                    <TableCell>{item.noShowCnt}명</TableCell>
                                    <TableCell>{item.competition}</TableCell>
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

export default LotteryList;

const Container = styled.div`
    padding: 20px 0px;
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
    height: 60px;
    &:hover {
        background: rgba(220, 220, 220, 0.6);
    }
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 12%;
`;

const TableHeaderDetail = styled(TableHeader)`
    width: 20%;
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
    font-size: 12px;
`;