import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';

import RadioButtonOption from '../../../components/user/Apply/RadioButtonOption';
import CarOption from '../../../components/user/Apply/CarOption';
import FinishedPage from './FinishedPage';
import Loading from '../../../components/user/Loading';

import getAppliesDate from '../../../API/user/getAppliesDate';
import getAbleVehicle from '../../../API/user/getAbleVehicle';
import applyVehicel from '../../../API/user/applyVehicel';
import getDetail from '../../../API/user/getDetail';
import patchApplyVehicel from '../../../API/user/patchApplyVehicel';

import useAutoRouting from '../../../utils/useAutoRouting';

interface Car {
    company: string;
    competition: number;
    fuel: string;
    img: string;
    model: string;
    round: number;
    seat: number;
    vehicleId: number;
    applyRoundId: number;
}

interface DateOption {
    round: number;
    takeDate: string;
    returnDate: string;
}

export default function ApplicationFormPage() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    // 페이지 전환 상태를 관리하는 state
    const [next, setNext] = useState<boolean>(false);

    // 이전에 신청한 내역이 있는지 확인하기 위한 state
    const [pastApplyId, setPastApplyId] = useState<number | undefined>();

    // 사용 목적과 선택한 날짜 및 차량을 관리하는 state
    const [purpose, setPurpose] = useState<string>('TRAVEL');
    const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [applyRoundId, setApplyRoundId] = useState<number | null>(null);

    // 신청 가능한 날짜 및 차량 목록을 저장하는 state
    const [dates, setDates] = useState<DateOption[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    // 데이터 로딩 상태 및 신청 완료 여부를 관리하는 state
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);

    // 컴포넌트가 마운트될 때 데이터(fetch) 로드를 수행
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 이전에 신청한 내역이 있는지 확인
                const getDetailResponse = await getDetail();
                if (getDetailResponse != null) {
                    setPastApplyId(getDetailResponse.applyId);
                }
                // 신청 가능한 날짜를 호출
                const dateResponse = await getAppliesDate();
                setDates(dateResponse);
            } catch (error) {
                console.error('Error fetching dates:', error);
                setDates([]); // 오류 발생 시 빈 배열로 설정
            } finally {
                setIsDataLoaded(true); // 데이터 로드 완료
            }
        };

        fetchData();
    }, []);

    // 날짜 변경 핸들러
    const handleDateChange = (date: DateOption) => setSelectedDate(date);

    // 사용 목적 변경 핸들러
    const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => setPurpose(event.target.value);

    // 차량 선택 핸들러
    const handleCarSelection = (car: Car) => {
        setSelectedCar(car);
        setApplyRoundId(car.applyRoundId); // 선택한 차량의 applyRoundId 저장
    };

    // 선택한 날짜에 따라 신청 가능한 차량 목록을 가져오는 함수
    const fetchCars = async () => {
        try {
            setIsDataLoaded(false); // 로딩 시작
            if (selectedDate) {
                const vehicleResponse = await getAbleVehicle(selectedDate.takeDate, selectedDate.returnDate);
                setCars(vehicleResponse || []); // 차량 목록 설정
            }
        } catch (error) {
            setCars([]);
        } finally {
            setIsDataLoaded(true); // 로딩 완료
        }
    };

    // 버튼 클릭 핸들러 - 신청 흐름 관리
    const handleButtonClick = async () => {
        if (!next) {
            // 첫 번째 단계에서 다음 단계로 전환
            setNext(true);
            await fetchCars(); // 다음 단계로 넘어가면 차량 목록을 불러옴
            return;
        }

        // 모든 필수 항목이 선택되었는지 확인
        if (!selectedDate || !purpose || !selectedCar) {
            alert('모든 항목을 선택해 주세요.');
            return;
        }
        setIsDataLoaded(false); // 로딩 상태로 전환
        try {
            let response;
            if (pastApplyId) {
                // 이전 신청 내역이 있을 경우
                response = await patchApplyVehicel(pastApplyId, applyRoundId as number, purpose);
            } else {
                // 이전 신청 내역이 없을 경우
                response = await applyVehicel(applyRoundId as number, purpose);
            }

            if (response.code === 'APPLY-001') {
                // 특정 조건에서의 오류 처리
                alert('만 26세 이하는 이용이 불가능합니다.');
                navigate('/mypage');
                return;
            }
        } catch (error) {
            console.error('차량 신청 중 오류가 발생했습니다.', error);
            return;
        } finally {
            // 신청 완료 후 라우팅 및 상태 업데이트
            autoRoutingFunc();
            setFinished(true);
            setIsDataLoaded(true);
        }
    };

    // 데이터 로딩 중인 경우 로딩 컴포넌트 표시
    if (!isDataLoaded) return <Loading />;
    // 신청이 완료된 경우 완료 페이지로 전환
    if (finished) return <FinishedPage />;

    return (
        <Container>
            <Title title="차량 신청" />
            {!next ? (
                <>
                    <SubTitle subTitle="탑승일을 선택해주세요." />
                    {dates.length === 0 ? (
                        <NoOptionsText>선택 가능한 일자가 없습니다.</NoOptionsText>
                    ) : (
                        dates.map((date, index) => (
                            <RadioButtonOption
                                key={index}
                                date={date}
                                isSelected={
                                    selectedDate?.takeDate === date.takeDate &&
                                    selectedDate?.returnDate === date.returnDate
                                }
                                onDateChange={handleDateChange}
                            />
                        ))
                    )}

                    <SubTitle subTitle="사용 목적을 선택해주세요." />
                    <Select value={purpose} onChange={handlePurposeChange}>
                        <option value="TRAVEL">여행</option>
                        <option value="EVENT">경조사</option>
                        <option value="HOBBY">학업</option>
                        <option value="SELF">개인사</option>
                        <option value="EDUCATION">교육</option>
                    </Select>

                    <ButtonContainer>
                        <Button onClick={handleButtonClick} disabled={!selectedDate}>
                            다음
                        </Button>
                    </ButtonContainer>
                </>
            ) : (
                <>
                    <SubTitle subTitle="탑승할 차량을 선택해주세요" />
                    <CarListContainer>
                        {cars.length === 0 ? (
                            <NoOptionsText>선택 가능한 차량이 없습니다.</NoOptionsText>
                        ) : (
                            cars.map((car) => (
                                <CarOption
                                    key={car.vehicleId}
                                    car={car}
                                    selectedCar={selectedCar}
                                    onCarSelection={handleCarSelection}
                                />
                            ))
                        )}
                    </CarListContainer>
                    <ButtonContainer>
                        <Button onClick={handleButtonClick}>신청하기</Button>
                    </ButtonContainer>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 8px;
    height: 55px;
    background-color: #ffffff;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const CarListContainer = styled.div`
    max-height: 430px;
    overflow-y: auto;
    margin-bottom: 20px;
`;

const NoOptionsText = styled.p`
    text-align: center;
    color: gray;
    margin-top: 20px;
`;
