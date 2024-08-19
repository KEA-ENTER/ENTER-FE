import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Button from '../../../components/user/UI/Button';
import SubTitle from '../../../components/user/UI/SubTitle';
import Title from '../../../components/user/UI/Title';
import Loading from '../../../components/user/Loading';

import getDetail from '../../../API/user/getDetail';
import getResult from '../../../API/user/getResult';
import deleteApplication from '../../../API/user/deleteApplication';
import useAutoRouting from '../../../utils/useAutoRouting';

export default function CompletedApplicationForm() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [date, setDate] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<string>('');
    const [applyId, setApplyId] = useState<number>();

    const [disableEdit, setDisableEdit] = useState<boolean>(false);

    const deleteHandler = async () => {
        if (applyId != null) {
            setIsLoading(true);
            try {
                await deleteApplication(applyId);
                await autoRoutingFunc();
            } catch (error) {
                console.error('삭제 실패:', error);
            } finally {
                setIsLoading(false);
                autoRoutingFunc();
            }
        }
    };

    const toApply = () => {
        navigate('/application');
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const resultData = await getResult();

                // 데이터가 정상적으로 반환된 경우
                const hasData = resultData.winning || resultData.waitingNumber !== null;
                setDisableEdit(hasData);
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
                <Button onClick={toApply} disabled={disableEdit}>
                    신청 수정
                </Button>
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
