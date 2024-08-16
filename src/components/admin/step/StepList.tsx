import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import DateString from '../basic/DateString';
import { useEffect, useState } from 'react';
import StepListModel from './model/StepListModel';
import Pagination from '../basic/Pagination';

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

const StepList: React.FC = () => {
    const [stepData, setStepData] = useState<StepItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    useEffect(() => {
        const pageNum = parseInt(page) - 1;

        StepListModel(word, type, pageNum).then(res => {
            if (res) {
                setStepData(res.reportList); 
                setTotalPage(res.totalPages);
            }
        });
    }, [type, word, page]);

    const navigate = useNavigate();

    const goRentReport = (id: number) => {
        navigate(`/admin/vehicle-step/rent/${id}`)
    }
    const goReturnReport = (id: number) => {
        navigate(`/admin/vehicle-step/return/${id}`)
    }

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
                            <TableRow>
                                <TableHeaderDetail>차량 정보</TableHeaderDetail>
                                <TableHeaderDetail>인수 기간</TableHeaderDetail>
                                <TableHeader>인수자명</TableHeader>
                                <TableHeader>상태</TableHeader>
                                <TableHeaderDetail></TableHeaderDetail>
                            </TableRow>
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
                                            isDisabled={item.state === 'BEFORE_TAKE'}
                                            >
                                            인수 보고서
                                        </ReportBtn>
                                        <ReportBtn 
                                            onClick={() => goReturnReport(item.winningId)} 
                                            disabled={item.state !== 'RETURN'} 
                                            isDisabled={item.state !== 'RETURN'}
                                            >
                                            반납 보고서
                                        </ReportBtn>
                                    </TableCellDetail>
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

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
    height: 60px;
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

const ReportBtn = styled.button<{ isDisabled: boolean }>`
    background-color: ${props => props.isDisabled ? '#ddd' : '#FEE500'};
    border: none;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    padding: 7px 12px;
    margin: 0px 5px;
    border-radius: 5px;
`;
