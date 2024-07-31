import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateString from "../basic/DateString";
import data from "../../../data/admin/question/question.json";

export default function QuestionList () {
    const navigate = useNavigate();
    const goQuestionDetail = (id: number) => {
        navigate(`/admin/question/detail/${id}`)
    }

    return (
        <Container>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>카테고리</TableHeader>
                        <TableHeaderDetail>내용</TableHeaderDetail>
                        <TableHeader>상태</TableHeader>
                        <TableHeader>작성자</TableHeader>
                        <TableHeader>날짜</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <TableRow key={item.id} onClick={() => goQuestionDetail(item.id)}>
                            <TableCell>{item.category}</TableCell>
                            <TableCellDetail>{item.contentSummary}...</TableCellDetail>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{DateString(item.date)}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Container>
  );
}

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

