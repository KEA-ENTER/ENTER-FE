import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '../../../components/user/UI/Button';
import SubTitle from '../../../components/user/UI/SubTitle';
import Title from '../../../components/user/UI/Title';

interface CompletedApplicationData {
    date: string;
    propose: string;
    selectedCar: string;
}

export default function CompletedApplicationForm() {
    const [date, setDate] = useState<string>('24.07.20~21 (토, 일)');
    const [propose, setPropose] = useState<string>('여행');
    const [seledtedCar, setSeledtedCar] = useState<string>('GT-R');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/completedapplicationform');
                const receivedData: CompletedApplicationData = response.data;
                setDate(receivedData.date);
                setPropose(receivedData.propose);
                setSeledtedCar(receivedData.selectedCar);
            } catch {
                console.log();
            } finally {
                console.log();
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Title title="차량 신청 내역" />
            <SubTitle subTitle="사용 가능 기한" />
            {/* <TextBox>{date}</TextBox> */}
            <TextBox>24.07.20~21 (토, 일)</TextBox>
            {/* API 연결 전 화면 구성용, API 연결시 지울 것. */}
            <SubTitle subTitle="사용 목적" />
            {/* <TextBox>{propose}</TextBox> */}
            <TextBox>여행</TextBox>
            {/* API 연결 전 화면 구성용, API 연결시 지울 것. */}
            <SubTitle subTitle="선택 차량" />
            {/* <TextBox>{seledtedCar}</TextBox> */}
            <TextBox>GT-R</TextBox>
            {/* API 연결 전 화면 구성용, API 연결시 지울 것. */}
            <ButtonContainer>
                <Button>신청 수정</Button>
                <Button>신청 취소</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    border: 1px solid red;
`;

const TextBox = styled.div`
    border-radius: 8px;
    background-color: #eeeeee;
    padding: 10px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
