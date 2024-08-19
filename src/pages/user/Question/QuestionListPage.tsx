import styled from 'styled-components';
import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/user/UI/Button';
import Title from '../../../components/user/UI/Title';
import Input from '../../../components/user/UI/Input';
import DateString from '../../../components/admin/basic/DateString';
import Pagination from '../../../components/admin/basic/Pagination';
import questionsList from '../../../API/user/questionsList';
import Loading from '../../../components/user/Loading';

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
    const [debouncedInput, setDebouncedInput] = useState<string>(userInput);
    const [questions, setQuestions] = useState<QuestionItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

    const navigate = useNavigate();

    const getCategoryText = (category: string) => {
        if (category === 'USER') return '사용자';
        else if (category === 'SERVICE') return '서비스';
        else if (category == 'VEHICLE') return '차량 문의';
        else if (category == 'ETC') return '기타';
        else return '';
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(userInput);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [userInput]);

    const fetchData = () => {
        setIsLoading(true);
        const pageNum = parseInt(page);
        questionsList(pageNum - 1, category, debouncedInput)
            .then((data) => {
                console.log(data);
                setQuestions(data.questions);
                setTotalPage(data.totalPages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch questions:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [category, debouncedInput, page]);

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

    if (isLoading) {
        return <Loading />;
    }

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
                <TitleBox>
                    <div>작성일</div>
                    <div>카테고리</div>
                    <div>내용</div>
                    <div>작성자</div>
                </TitleBox>
                {questions.map((item) => (
                    <TextBox key={item.questionId} onClick={() => goQuestionDetail(item.questionId)}>
                        <DateContainer>{DateString(item.questionCreatedAt)}</DateContainer>
                        <div>{getCategoryText(item.category)}</div>
                        <CutContent>{item.questionContent}</CutContent>
                        <div>{item.name}</div>
                    </TextBox>
                ))}
            </ListContainer>
            <Pagination totalPages={totalPage} />
            <ButtonContainer>
                <Button onClick={() => goQuestionWrite()}>문의하기</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const UserInputContainer = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const SelectContainer = styled.div`
    flex: 2;
    height: 70px;
`;

const Select = styled.select`
    width: 90%;
    height: 55px;
    padding: 8px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 200;
    border: 1px solid black;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    height: 70px;
    flex: 3;
`;

const ListContainer = styled.div`
    border-radius: 8px;
`;

const TitleBox = styled.div`
    border-radius: 8px;
    background-color: #fee500;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-weight: 700;
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

const DateContainer = styled.div`
    width: 20%;
`;

const CutContent = styled.div`
    width: 40%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
