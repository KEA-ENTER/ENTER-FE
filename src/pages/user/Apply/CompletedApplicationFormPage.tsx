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
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
    const { autoRoutingFunc } = useAutoRouting(); // 자동 라우팅

    // 데이터 로딩 상태를 관리하는 State
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 신청 내역 데이터를 저장하는 State
    const [date, setDate] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<string>('');
    const [applyId, setApplyId] = useState<number>();

    // 신청 수정 버튼의 활성화/비활성화를 관리하는 State
    const [disableEdit, setDisableEdit] = useState<boolean>(false);

    // 신청 취소 핸들러
    const deleteHandler = async () => {
        if (applyId != null) {
            setIsLoading(true); // 로딩 상태 활성화
            try {
                await deleteApplication(applyId); // 신청 삭제 API 호출
                await autoRoutingFunc(); // 삭제 후 자동 라우팅
            } catch (error) {
                console.error('삭제 실패:', error); // 에러 발생 시 콘솔에 로그
            } finally {
                setIsLoading(false); // 로딩 상태 비활성화
                autoRoutingFunc(); // 마지막으로 자동 라우팅 호출
            }
        }
    };

    // 신청 수정 페이지로 이동하는 핸들러
    const toApply = () => {
        navigate('/application'); // 신청 페이지로 이동
    };

    // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
    useEffect(() => {
        setIsLoading(true); // 로딩 상태 활성화
        const fetchData = async () => {
            try {
                const resultData = await getResult(); // 신청 결과 API 호출

                // 신청 결과가 있는지 여부를 확인하고, 수정 가능 여부 설정
                const hasData = resultData.winning || resultData.waitingNumber !== null;
                setDisableEdit(hasData); // 데이터에 따라 수정 버튼 활성화/비활성화

                const getDetailResponse = await getDetail(); // 신청 내역 상세 정보 호출
                setApplyId(getDetailResponse.applyId); // 신청 ID 설정
                setDate(getDetailResponse.takeDate); // 사용 가능 날짜 설정
                setPurpose(getDetailResponse.purpose); // 사용 목적 설정
                setSelectedCar(getDetailResponse.model); // 선택된 차량 모델 설정
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error); // 에러 발생 시 콘솔에 로그
            } finally {
                setIsLoading(false); // 로딩 상태 비활성화
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    // 데이터 로딩 중에는 로딩 컴포넌트를 표시
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
                </Button>{' '}
                <Button onClick={deleteHandler}>신청 취소</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    // border: 1px solid red; // 스타일 확인을 위한 디버그 코드 (현재 비활성화)
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
