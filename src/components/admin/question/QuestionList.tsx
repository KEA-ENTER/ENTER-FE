import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from '../basic/Pagination';
import DateString from "../basic/DateString";
import QuestionListModel from "../../../API/admin/question/QuestionListModel";

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

// 문의 관리 리스트
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
    
    // 문의 카테고리 중 프론트에서 보여지는 단어와 서버의 식별 키워드를 매칭한다.
    const getStatusText = (state: string) => {
        if (state === 'COMPLETE')
            return '답변 완료';
        else if (state === 'WAIT')
            return '대기';
        else
            return '';
    }

    // 문의 내역 API를 호출한다.
    useEffect(() => {
        // 보여지는 페이지와 서버의 페이지 번호를 맞춘다.
        const pageNum = parseInt(page) - 1;
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
            <Table>
                <thead>
                    <TableTitle>
                        <TableHeader>카테고리</TableHeader>
                        <TableHeaderDetail>내용</TableHeaderDetail>
                        <TableHeader>상태</TableHeader>
                        <TableHeader>작성자</TableHeader>
                        <TableHeader>날짜</TableHeader>
                    </TableTitle>
                </thead>
                <tbody>
                    {questionData.map((item) => (
                        <TableRow key={item.questionId} onClick={() => goQuestionDetail(item.questionId)}>
                            <TableCell>{getCategoryText(item.category)}</TableCell>
                            <TableCellDetail>{item.questionContent}</TableCellDetail>
                            <TableCell>{getStatusText(item.state)}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{DateString(item.questionCreatedAt)}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <Pagination totalPages={totalPage} pagesPerGroup={10}/>
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
    text-overflow: ellipsis;
`;

