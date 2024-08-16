import styled from 'styled-components';
import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/user/UI/Button';
import Title from '../../../components/user/UI/Title';
import Input from '../../../components/user/UI/Input';
import DateString from '../../../components/admin/basic/DateString';
import Pagination from '../../../components/admin/basic/Pagination';
import questionsList from '../../../API/user/questionsList';

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

export default function QuestionListPage() {
    const query = Query();
    const type = query.get('type') ?? 'ALL';
    const word = query.get('q') ?? '';
    const page = query.get('page') ?? '1';

    const [category, setCategory] = useState<string>(type);
    const [userInput, setUserInput] = useState<string>(word);
    const [questions, setQuestions] = useState<QuestionItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const navigate = useNavigate();

    const getCategoryText = (category: string) => {
        if (category === 'USER') return '사용자';
        else if (category === 'SERVICE') return '서비스';
        else if (category == 'VEHICLE') return '차량 문의';
        else if (category == 'ETC') return '기타';
        else return '';
    };

    const fetchData = () => {
        const pageNum = parseInt(page);
        questionsList(pageNum, category, userInput)
            .then((data) => {
                setQuestions(data.questions);
                setTotalPage(data.totalPages);
                // console.log("data: ", data.questions);
            })
            .catch((error) => {
                console.error('Failed to fetch questions:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [category, userInput, page]);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleUserInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const goQuestionDetail = (id: number) => {
        navigate(`/questiondetail/${id}`);
    };

    const goQuestionWrite = () => {
        navigate(`/write`);
    };

    return (
        <Container>
            <Title title="문의 게시판" />
            <UserInputContainer>
                <SelectContainer>
                    <Select value={category} onChange={handleCategoryChange}>
                        <option value="전체">전체</option>
                        <option value="카테고리">카테고리</option>
                        <option value="상태">상태</option>
                        <option value="작성자">작성자</option>
                    </Select>
                </SelectContainer>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="키워드를 입력하세요"
                        value={userInput}
                        onChange={handleUserInputChange}
                    />
                </InputContainer>
            </UserInputContainer>
            <ListContainer>
                {questions.map((item) => (
                    <TextBox key={item.questionId} onClick={() => goQuestionDetail(item.questionId)}>
                        <div>{DateString(item.questionCreatedAt)}</div>
                        <div>{getCategoryText(item.category)}</div>
                        <CutContent>{item.questionContent}</CutContent>
                        <div>{item.name}</div>
                    </TextBox>
                ))}
            </ListContainer>
            <ButtonContainer>
                <Button onClick={() => goQuestionWrite()}>문의하기</Button>
            </ButtonContainer>
            <Pagination totalPages={totalPage} />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const UserInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SelectContainer = styled.div`
    flex: 2;
    padding: 10px 5px;
`;

const InputContainer = styled.div`
    flex: 3;
    padding: 10px 5px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 200;
    border: 1px solid black;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const ListContainer = styled.div`
    border-radius: 8px;
    padding: 10px;
`;

const TextBox = styled.div`
    border-radius: 8px;
    background-color: #eeeeee;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
    text-align: center;
`;

const CutContent = styled.div`
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
