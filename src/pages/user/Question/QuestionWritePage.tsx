import styled from 'styled-components';
import { useState, ChangeEvent, FormEvent } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function QuestionWritePage() {
    const accessToken = sessionStorage.getItem('accessToken'); // 세션에서 액세스 토큰 가져오기

    const [category, setCategory] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const navigate = useNavigate();

    // 선택된 카테고리의 한글 텍스트를 영문 텍스트로 변환하는 함수
    const getCategoryText = (categoryToEnglish: string) => {
        if (categoryToEnglish === '사용자') return 'USER';
        else if (categoryToEnglish === '서비스') return 'SERVICE';
        else if (categoryToEnglish === '차량 문의') return 'VEHICLE';
        else if (categoryToEnglish === '기타') return 'ETC';
        else return '';
    };

    // 카테고리 변경 핸들러
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    // 내용 변경 핸들러
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    // 양식 제출 핸들러
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); //기본 동작 막기

        try {
            // 문의 데이터 서버 전송
            await axios.post(
                `${BASE_URL}/questions`,
                {
                    category: getCategoryText(category), // 선택된 카테고리의 텍스트
                    content: content, // 사용자가 입력한 내용
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            // 문의 목록 페이지로 이동
            navigate(`/question`);
        } catch (error) {
            console.error('There was an error submitting the question:', error);
            alert('문의 제출 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container onSubmit={handleSubmit}>
            <Title title="문의하기" />
            <Select value={category} onChange={handleCategoryChange}>
                <option value="사용자">사용자</option>
                <option value="서비스">서비스</option>
                <option value="차량 문의">차량 문의</option>
                <option value="기타">기타</option>
            </Select>{' '}
            <Input placeholder="내용을 입력하세요" value={content} onChange={handleContentChange} />{' '}
            <ButtonContainer>
                <Button>제출하기</Button>
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
