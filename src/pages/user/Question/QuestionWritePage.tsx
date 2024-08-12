import styled from 'styled-components';
import { useState, ChangeEvent, FormEvent } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button'; // Button 컴포넌트 추가

export default function QuestionWritePage() {
    const [category, setCategory] = useState<string>('차량이용');
    const [content, setContent] = useState<string>('');

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // 입력된 데이터 처리 로직 추가
        console.log('Category:', category);
        console.log('Content:', content);
        // 여기에서 서버로 데이터를 전송하거나 다른 로직을 추가할 수 있습니다.
    };

    return (
        <Container onSubmit={handleSubmit}>
            <Title title="문의하기" />
            <Select value={category} onChange={handleCategoryChange}>
                <option value="전체">전체</option>
                <option value="내용">내용</option>
                <option value="작성자">작성자</option>
            </Select>
            <Input placeholder="내용을 입력하세요" value={content} onChange={handleContentChange}></Input>
            <ButtonContainer>
                <Button>문의하기</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.form`
    width: 100%;
`;

const Select = styled.select`
    width: 100%;
    padding: 15px 10px;
    background-color: #fee500;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const Input = styled.textarea`
    width: 100%;
    height: 200px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
    font-size: 15px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    
`;
