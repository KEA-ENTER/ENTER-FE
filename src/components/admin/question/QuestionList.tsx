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

    // 여기서부터 api 관련
    // 1. lotteryData로 되어 있는데 상황에 맞게 변수명만 변경해서 사용하면 됨, 그리고 <위에서만든인터페이스이름[]>으로 수정
    const [questionData, setQuestionData] = useState<QuestionItem[]>([]);
    // 2. 얘는 그냥 복붙
    const [totalPage, setTotalPage] = useState(0);

    // 3. 건너뛰어
    const navigate = useNavigate();
    
    // 4. 아래 4줄 싸그리싹싹 복붙
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

    // 5. api 불러오는 부분
    useEffect(() => {
        const pageNum = parseInt(page);
        QuestionListModel(word, type, pageNum).then(res => {
            if (res) {
                // 여기 밑에 두 줄만 수정하면 됨
                setQuestionData(res.questions);
                setTotalPage(res.totalPages); // totalPages 저장 (서버에서 보내준 총 페이지 수)
            }
        });
    }, [type, word, page]);
    // 여기까지 api 관련

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

