import styled from "styled-components";
import DateString from "../basic/DateString";

interface VehicleReportProps {
    reportInfo: {
        names: string[];
        reportCreatedAts: string[];
        contents: string[];
    }
}

// 차량 상세보기 특이사항을 보여주는 컴포넌트
const VehicleDetailReport: React.FC<VehicleReportProps> = ({ reportInfo }) => {
    return(
        <Container>
            <Title>특이사항</Title>
            <Table>
                <thead>
                <TableRow>
                    <TableHeader>보고자명</TableHeader>
                    <TableHeader>보고날짜</TableHeader>
                    <TableHeaderDetail>내용</TableHeaderDetail>
                </TableRow>
                </thead>
                <tbody>
                {reportInfo.names.map((name, index) => (
                    <TableRow key={index}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{DateString(reportInfo.reportCreatedAts[index])}</TableCell>
                        <TableCellDetail>{reportInfo.contents[index]}</TableCellDetail>
                    </TableRow>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default VehicleDetailReport;

// Style
const Container = styled.div`
    background: rgba(238, 238, 238, 0.6);
    margin: 20px 0px 0px 0px;
    padding: 20px;
    margin: 10px 0px;
    border-radius: 0px;
`;

const Title = styled.div`
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 20%;
`;

const TableHeaderDetail = styled(TableHeader)`
    width: 40%;
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    width: 20%;
`;

const TableCellDetail = styled(TableCell)`
    width: 40%;
`;