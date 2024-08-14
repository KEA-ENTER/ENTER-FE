import styled from 'styled-components';
import { useState, useEffect, ChangeEvent } from 'react';
import Button from '../../../components/user/UI/Button';
import Title from '../../../components/user/UI/Title';
import Input from '../../../components/user/UI/Input';

import questionsList from '../../../API/user/questionsList';

interface QuestionItem {
    date: string;
    content: string;
    author: string;
}

export default function QuestionListPage() {
    const [category, setCategory] = useState<string>('내용');
    const [userInput, setUserInput] = useState<string>('');
    const [questions, setQuestions] = useState<QuestionItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await questionsList(1); //페이지에 맞게 파라미터 작성
                setQuestions(data);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleUserInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    return (
        <Container>
            <Title title="문의 게시판" />
            <UserInputContainer>
                <SelectContainer>
                    <Select value={category} onChange={handleCategoryChange}>
                        <option value="전체">전체</option>
                        <option value="내용">내용</option>
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
                {questions.map((question, index) => (
                    <TextBox key={index}>
                        <div>{question.date}</div>
                        <div>{question.content}</div>
                        <div>{question.author}</div>
                    </TextBox>
                ))}
            </ListContainer>
            <ButtonContainer>
                <Button>문의하기</Button>
            </ButtonContainer>
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
