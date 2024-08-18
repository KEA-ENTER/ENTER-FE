import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button'; // Button 컴포넌트 추가
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function QuestionModifyPage() {
    const [category, setCategory] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { id } = useParams();
    const navigate = useNavigate();  
    const accessToken = sessionStorage.getItem('accessToken');

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
    
    const fetchData = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            setCategory(response.data.category)
            setContent(response.data.questionContent)
        } catch (error) {
            console.error('API 요청 실패:', error);
            throw error;
        }
        
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.patch(
                `${BASE_URL}/questions/${id}`,
                { category: category, content: content },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate(`/questiondetail/${id}`);
        } catch (error) {
            console.error('수정 요청 실패:', error);
        }
    };

    return (
        <Container onSubmit={handleSubmit}>
            <Title title="문의하기" />
            <Select value={getCategoryText(category)} onChange={handleCategoryChange}>
                <option value="사용자">사용자</option>
                <option value="서비스">서비스</option>
                <option value="차량 문의">차량 문의</option>
                <option value="기타">기타</option>
            </Select>
            <Input placeholder="내용을 입력하세요" value={content} onChange={handleContentChange}></Input>
            <ButtonContainer>
                <Button>제출하기</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.form`
    width: 100%;
`;


const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
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