import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button';
import SubTitle from '../../../components/user/UI/SubTitle';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/user/UI/BackButton';
import Loading from '../../../components/user/Loading';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export default function QuestionDetailPage() {
    const [category, setCategory] = useState<string>(''); // 문의 카테고리
    const [content, setContent] = useState<string>(''); // 문의 내용
    const [answerContent, setAnswerContent] = useState<string>(''); // 답변 내용
    const [myQuestion, setMyQuestion] = useState<boolean>(false); // 내가 작성한 문의인지 여부
    const [questionAuthor, setQuestionAuthor] = useState<string>(''); // 문의 작성자
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태

    const { id } = useParams();
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken'); // 세션 토큰 가져오기

    // 카테고리 텍스트 변환 함수
    const getCategoryText = (category: string) => {
        if (category === 'USER') return '사용자';
        else if (category === 'SERVICE') return '서비스';
        else if (category === 'VEHICLE') return '차량 문의';
        else if (category === 'ETC') return '기타';
        else return '';
    };

    // 수정하기 버튼 클릭 핸들러
    const handleModifyClick = () => {
        navigate(`/questionModify/${id}`); // 수정하기 페이지로 이동
    };

    // 삭제하기 버튼 클릭 핸들러
    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${BASE_URL}/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('삭제가 완료되었습니다.');
            navigate('/question'); // 질문 목록 페이지로 이동
        } catch (error) {
            console.error('삭제 요청 실패:', error);
            alert('삭제 요청에 실패했습니다.');
        }
    };

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            setCategory(response.data.category); // 카테고리 설정
            setQuestionAuthor(response.data.name); // 작성자 이름 설정
            setContent(response.data.questionContent); // 문의 내용 설정
            setAnswerContent(response.data.answerContent); // 답변 내용 설정
            setMyQuestion(response.data.myQuestion); // 내가 작성한 문의 여부 설정
            setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 해제
        } catch (error) {
            console.error('API 요청 실패:', error);
            setIsLoading(false);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);

    // 로딩 중일 때 로딩 컴포넌트 표시
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <TitleContainer>
                <BackButton />
                <Title title="문의 내용" />
            </TitleContainer>
            <CategoryBox>{getCategoryText(category)}</CategoryBox>
            <AuthorBox>
                <SubTitle subTitle="문의 내용" />
                <Author>작성자: {questionAuthor}</Author>
            </AuthorBox>
            <TextBox>{content}</TextBox>
            {answerContent ? (
                <>
                    <SubTitle subTitle="문의 답변" />
                    <TextBox>{answerContent}</TextBox>
                </>
            ) : (
                myQuestion && (
                    <ButtonContainer>
                        <Button onClick={handleModifyClick}>수정하기</Button>
                        <Button onClick={handleDeleteClick}>삭제하기</Button>
                    </ButtonContainer>
                )
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const CategoryBox = styled.div`
    padding: 15px 10px;
    background-color: #fee500;
    font-size: 18px;
    font-weight: 500;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const Author = styled.div`
    width: 130px;
    margin-top: 10px;
    font-weight: 500;
`;

const AuthorBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
