import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button'; // Button 컴포넌트 추가
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function QuestionModifyPage() {
    const [category, setCategory] = useState<string>(''); // 문의 카테고리 관리
    const [content, setContent] = useState<string>(''); // 문의 내용 관리
    const { id } = useParams(); // URL 파라미터에서 문의 ID 가져오기
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken'); // 세션에서 액세스 토큰 가져오기

    // 카테고리 텍스트 변환 함수
    const getCategoryText = (category: string) => {
        if (category === 'USER') return '사용자';
        else if (category === 'SERVICE') return '서비스';
        else if (category === 'VEHICLE') return '차량 문의';
        else if (category === 'ETC') return '기타';
        else return '';
    };

    // 기존 문의 데이터를 서버에서 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            setCategory(response.data.category); // 가져온 데이터로 카테고리 설정
            setContent(response.data.questionContent); // 가져온 데이터로 문의 내용 설정
        } catch (error) {
            console.error('API 요청 실패:', error); // API 요청 실패 시 에러 출력
            throw error;
        }
    };

    // 컴포넌트가 마운트될 때 fetchData 함수 호출
    useEffect(() => {
        fetchData();
    }, []);

    // 카테고리 변경 핸들러
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    // 내용 변경 핸들러
    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    // 양식 제출 핸들러
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 기본 동작 막기
        try {
            await axios.patch(
                `${BASE_URL}/questions/${id}`,
                { category: category, content: content },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            navigate(`/questiondetail/${id}`); // 수정 후 문의 상세 페이지로 이동
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
            <Input placeholder="내용을 입력하세요" value={content} onChange={handleContentChange} />
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
