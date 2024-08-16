import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import DateString from '../basic/DateString';
import { useEffect, useState } from 'react';
import LotteryListModel from './model/LotteryListModel';
import Pagination from '../basic/Pagination';

// api에서 불러올 아이템들의 이름과 타입을 작성해준다.
// 사용해야 하는 api에 따라 다르게 작성해서 사용
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

// url에서 쿼리문을 가져오기 위해 필요한 것 (밑에 3줄 그냥 복붙하면 도이)
function Query() {
    return new URLSearchParams(useLocation().search);
}

const LotteryList: React.FC = () => {

    // 여기서부터 api 관련
    // 1. lotteryData로 되어 있는데 상황에 맞게 변수명만 변경해서 사용하면 됨, 그리고 <위에서만든인터페이스이름[]>으로 수정
    const [lotteryData, setLotteryData] = useState<LotteryItem[]>([]);
    // 2. 얘는 그냥 복붙
    const [totalPage, setTotalPage] = useState(0);

    // 3. 건너뛰어
    const navigate = useNavigate();
    
    // 4. 아래 4줄 싸그리싹싹 복붙
    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    // 5. api 불러오는 부분
    useEffect(() => {
        const pageNum = parseInt(page) - 1;
        LotteryListModel(word, type, pageNum).then(res => {
            if (res) {
                // 여기 밑에 두 줄만 수정하면 됨
                setLotteryData(res.lotteryList); // lotteryList 저장 (서버에서 만든 리스트 이름이 lotteryList임)
                setTotalPage(res.totalPages); // totalPages 저장 (서버에서 보내준 총 페이지 수)
            }
        });
    }, [type, word, page]);
    // 여기까지 api 관련

    const goLotteryDetail = (round: number, date: string, vehicleModel: string, applyRoundId: string) => {
        navigate(`/admin/lottery/detail/${applyRoundId}/${round}/${date}/${vehicleModel}`)
    }

    // 1. 여기 밑에서 lotteryData.map 하고 뒤에 아이템들이 있는데, 현재 상태는 이다현이 만든 더미데이터의 이름들임.
    // 이걸 서버 api의 이름 == 위에서 만든 인터페이스의 이름에 맞게 수정해줘야 함.
    // 2. pagination의 이름을 10(테스트용)에서 totalPage로 변경한다.
    return (
        <Container>
            {lotteryData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
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
                            {lotteryData.map((item, idx) => (
                                <TableRow key={idx} onClick={() => goLotteryDetail(item.round, item.takeDate, item.vehicleModel, item.applyRoundId.toString())}>
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
                    <Pagination totalPages={totalPage} />
                </>
            )}
        </Container>
  );
};

export default LotteryList;

// Style
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