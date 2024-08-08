import styled from 'styled-components';
import { useState, ChangeEvent } from 'react';

import Button from '../../../components/user/UI/Button';
import Title from '../../../components/user/UI/Title';
import Input from '../../../components/user/UI/Input';

export default function QuestionListPage() {
    const [category, setCategory] = useState<string>('내용');
    const [userInput, setUserInput] = useState<string>('');

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
                    ></Input>
                </InputContainer>
            </UserInputContainer>
            <ListContainer>
                <TextBox>
                    <div>작성일</div>
                    <div>내용</div>
                    <div>이름</div>
                </TextBox>
                <TextBox>
                    <div>작성일</div>
                    <div>내용</div>
                    <div>이름</div>
                </TextBox>
            </ListContainer>
            <ButtonContainer>
                <Button>문의하기</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    // border: 1px solid red;
    width: 100%;
`;

const UserInputContainer = styled.div`
    // border: 1px solid red;
    display: flex;
    align-items: center;
`;

const SelectContainer = styled.div`
    // border: 1px solid red;
    flex: 2;
    padding: 10px 5px 10px 5px;
`;

const InputContainer = styled.div`
    // border: 1px solid red;
    flex: 3;
    padding: 10px 5px 10px 5px;
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
    // background-color: #eeeeee;
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
