import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateString from "../basic/DateString";
import { useEffect, useState } from 'react';
import QuestionListModel from "./model/QuestionListModel";
import Pagination from '../basic/Pagination';

interface QuestionItem {
    questionId: number;
    name: string;
    questionContent: string;
    category: string;
    questionCreatedAt: string;
    state: string;
    totalPages: Int16Array;
    hasNextPage: boolean;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

export default function QuestionList () {

    const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();
    
    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    const getCategoryText = (category: string) => {
        if (category === 'USER')
            return '사용자';
        else if (category === 'SERVICE')
            return '서비스';
        else if (category == 'VEHICLE')
            return '차량 문의';
        else if (category == 'ETC')
            return '기타';
        else
            return '';
    }

    const getStatusText = (state: string) => {
        if (state === 'COMPLETE')
            return '답변 완료';
        else if (state === 'WAIT')
            return '대기';
        else
            return '';
    }

    useEffect(() => {
        const pageNum = parseInt(page);
        QuestionListModel(word, type, pageNum).then(res => {
            if (res) {
                setQuestionData(res.questions);
                setTotalPage(res.totalPages); 
            }
        });
    }, [type, word, page]);

    const goQuestionDetail = (id: number) => {
        navigate(`/admin/question/detail/${id}`)
    }

    return (
        <Container>
            {questionData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
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
                            {questionData.map((item) => (
                                <TableRow key={item.questionId} onClick={() => goQuestionDetail(item.questionId)}>
                                    <TableCell>{getCategoryText(item.category)}</TableCell>
                                    <TableCellDetail>{item.questionContent}...</TableCellDetail>
                                    <TableCell>{getStatusText(item.state)}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{DateString(item.questionCreatedAt)}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination totalPages={totalPage} />
                </>
            )}
        </Container>
  );
}

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

