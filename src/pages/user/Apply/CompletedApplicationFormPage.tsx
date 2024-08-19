import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/user/UI/Button';
import SubTitle from '../../../components/user/UI/SubTitle';
import Title from '../../../components/user/UI/Title';
import Loading from '../../../components/user/Loading';

import getDetail from '../../../API/user/getDetail';
import deleteApplication from '../../../API/user/deleteApplication';
import autoRouting from '../../../API/user/autoRouting';
import navigateBasedOnRoutingId from '../../../utils/navigateOnRoutingId';

export default function CompletedApplicationForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [date, setDate] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<string>('');
    const [applyId, setApplyId] = useState<number>();

    const deleteHandler = async () => {
        console.log('deleteHandler');
        if (applyId != null) {
            try {
                const deleteResponse = await deleteApplication(applyId);
                console.log(deleteResponse);
                const autoRoutingResponse = await autoRouting();
                sessionStorage.setItem('autoRoutingPage', autoRoutingResponse.routingId.toString());
                navigateBasedOnRoutingId(Number(sessionStorage.getItem('autoRoutingPage')), navigate);
            } catch (error) {
                console.error('삭제 실패:', error);
            }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const getDetailResponse = await getDetail();
                setApplyId(getDetailResponse.applyId);
                setDate(getDetailResponse.takeDate);
                setPurpose(getDetailResponse.purpose);
                setSelectedCar(getDetailResponse.model);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Title title="차량 신청 내역" />
            <SubTitle subTitle="사용 가능 기한" />
            <TextBox>{date}</TextBox>

            <SubTitle subTitle="사용 목적" />
            <TextBox>{purpose}</TextBox>

            <SubTitle subTitle="선택 차량" />
            <TextBox>{selectedCar}</TextBox>

            <ButtonContainer>
                <Button>신청 수정</Button>
                <Button onClick={deleteHandler}>신청 취소</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    // border: 1px solid red;
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
