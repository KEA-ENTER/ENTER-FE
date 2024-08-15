import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button'; // Button 컴포넌트 추가
import SubTitle from '../../../components/user/UI/SubTitle';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function QuestionDetailPage() {
    const [category, setCategory] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [answerContent, setAnswerContent] = useState<string>('');
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

    const handleModifyClick = () => {
        navigate(`/questionModify/${id}`); // 수정하기 페이지로 이동
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${BASE_URL}/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('삭제가 완료되었습니다.');
            navigate('/questions'); // 질문 목록 페이지로 이동
        } catch (error) {
            console.error('삭제 요청 실패:', error);
            alert('삭제 요청에 실패했습니다.');
        }
    };
    
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
            setAnswerContent(response.data.answerContent)
        } catch (error) {
            console.error('API 요청 실패:', error);
            throw error;
        }
        
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Title title="문의 내용" />
            <CategoryBox>{getCategoryText(category)}</CategoryBox>
            <SubTitle subTitle="문의 내용" />
            <TextBox>{content}</TextBox>
            {answerContent ? (
                <>
                    <SubTitle subTitle="문의 답변" />
                    <TextBox>{answerContent}</TextBox>
                </>
            ) : (
                <ButtonContainer>
                    <Button onClick={handleModifyClick}>수정하기</Button>
                    <Button onClick={handleDeleteClick}>삭제하기</Button>
                </ButtonContainer>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const CategoryBox = styled.div`
    padding: 15px 10px;
    background-color: #fee500;
    font-size: 18px;
    font-weight: 500;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const TextBox = styled.p`
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
    display: flex;
    justify-content: flex-end;
`;
