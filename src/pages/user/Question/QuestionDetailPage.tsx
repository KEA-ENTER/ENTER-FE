import styled from 'styled-components';
import { useState } from 'react';
import Title from '../../../components/user/UI/Title';
import Button from '../../../components/user/UI/Button'; // Button 컴포넌트 추가
import SubTitle from '../../../components/user/UI/SubTitle';

export default function QuestionDetailPage() {
    const [category, setCategory] = useState<string>('차량 이용관련');
    const [content, setContent] = useState<string>('차량 스펙업 플리즈');
    const [isAnswer, setIsAnswer] = useState<boolean>(false);

    return (
        <Container>
            <Title title="문의 내용" />
            <CategoryBox>{category}</CategoryBox>
            <SubTitle subTitle="문의 내용" />
            <TextBox>{content}</TextBox>
            {isAnswer ? (
                <>
                    <SubTitle subTitle="문의 내용" />
                    <TextBox>{content}</TextBox>
                </>
            ) : (
                <ButtonContainer>
                    <Button>수정하기</Button>
                    <Button>삭제하기</Button>
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
