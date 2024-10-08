import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../basic/Pagination';
import DateString from '../basic/DateString';
import StepListModel from '../../../API/admin/step/StepListModel';

interface StepItem {
    winningId: number;
    vehicleModel: string;
    vehicleNo: string;
    takeDate: string;
    returnDate: string;
    memberName: string;
    state: string;
    hasTakeReport: boolean;
    hasReturnReport: boolean;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

// 인수 관리 페이지 리스트
const StepList: React.FC = () => {
    const [stepData, setStepData] = useState<StepItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    // 인수 내역 API를 호출한다.
    useEffect(() => {
        // 보여지는 페이지와 서버의 페이지 번호를 맞춘다.
        const pageNum = parseInt(page) - 1;

        StepListModel(word, type, pageNum).then(res => {
            if (res) {
                setStepData(res.reportList); 
                setTotalPage(res.totalPages);
            }
        });
    }, [type, word, page]);

    // 리스트의 아이디에 맞게 인수/반납 보고서로 이동
    const goRentReport = (id: number) => {
        navigate(`/admin/vehicle-step/rent/${id}`)
    }
    const goReturnReport = (id: number) => {
        navigate(`/admin/vehicle-step/return/${id}`)
    }

    // 서버에서 받아오는 상태에 따라 화면에서 보여줄 단어로 변환
    const getStatusText = (state: string) => {
        if (state === 'RETURN')
            return '반납 완료';
        else if (state === 'TAKE')
            return '인수중';
        else if (state === 'BEFORE_TAKE')
            return '인수 대기';
        else
            return '';
    }

    return (
        <Container>
            {stepData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
                    <Table>
                        <thead>
                            <TableTitle>
                                <TableHeaderDetail>차량 정보</TableHeaderDetail>
                                <TableHeaderDetail>인수 기간</TableHeaderDetail>
                                <TableHeader>인수자명</TableHeader>
                                <TableHeader>상태</TableHeader>
                                <TableHeaderDetail></TableHeaderDetail>
                            </TableTitle>
                        </thead>
                        <tbody>
                            {stepData.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCellDetail>{item.vehicleModel} - {item.vehicleNo}</TableCellDetail>
                                    <TableCellDetail>{DateString(item.takeDate)}{" ~ "}{DateString(item.returnDate)}</TableCellDetail>
                                    <TableCell>{item.memberName}</TableCell>
                                    <TableCell>{getStatusText(item.state)}</TableCell>
                                    <TableCellDetail>
                                        <ReportBtn 
                                            onClick={() => goRentReport(item.winningId)} 
                                            disabled={item.state === 'BEFORE_TAKE'} 
                                            $isdisabled={item.state === 'BEFORE_TAKE'}
                                            >
                                            인수 보고서
                                        </ReportBtn>
                                        <ReportBtn 
                                            onClick={() => goReturnReport(item.winningId)} 
                                            disabled={item.state !== 'RETURN'} 
                                            $isdisabled={item.state !== 'RETURN'}
                                            >
                                            반납 보고서
                                        </ReportBtn>
                                    </TableCellDetail>
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

export default StepList;

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
    width: 10%;
`;

const TableHeaderDetail = styled(TableHeader)`
    width: 20%;
`;

const TableCell = styled.td`
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;

const TableCellDetail = styled(TableCell)`
    width: 20%;
`;

const ReportBtn = styled.button<{ $isdisabled: boolean }>`
    background-color: ${props => props.$isdisabled ? '#ddd' : '#FEE500'};
    border: none;
    cursor: ${props => props.$isdisabled ? 'not-allowed' : 'pointer'};
    padding: 7px 12px;
    margin: 0px 5px;
    border-radius: 5px;
`;
