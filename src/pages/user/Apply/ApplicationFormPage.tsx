import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';
import RadioButtonOption from '../../../components/user/Apply/RadioButtonOption';
import CarOption from '../../../components/user/Apply/CarOption';
import FinishedPage from './FinishedPage';

import getAppliesDate from '../../../API/user/getAppliesDate';
import getAbleVehicle from '../../../API/user/getAbleVehicle';
import Loading from '../../../components/user/Loading';

interface Car {
    id: number;
    name: string;
    type: string;
    brand: string;
    capacity: number;
    ratio: string;
    imageUrl: string;
}

interface DateOption {
    round: number;
    takeDate: string;
    returnDate: string;
}

export default function ApplicationFormPage() {
    const [purpose, setPurpose] = useState<string>('여행'); // 사용 목적
    const [next, setNext] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<DateOption | null>(null); // 탑승일
    const [selectedCar, setSelectedCar] = useState<Car | null>(null); // 탑승할 차량
    const [dates, setDates] = useState<DateOption[]>([]); // state로 변경된 탑승일
    const [cars, setCars] = useState<Car[]>([]); // state로 변경된 차량 데이터
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateResponse = await getAppliesDate(); // API 호출 함수 사용
                setDates(dateResponse);
            } catch (error) {
                console.error('Error fetching dates:', error);
                setDates([]); // 에러 발생 시 dates를 빈 배열로 설정
            } finally {
                setIsDataLoaded(true);
            }
        };

        fetchData();
    }, []);

    const handleDateChange = (date: DateOption) => setSelectedDate(date);

    const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => setPurpose(event.target.value);

    const handleCarSelection = (car: Car) => setSelectedCar(car);

    const fetchCars = async () => {
        try {
            setIsDataLoaded(false); // 로딩 시작
            if (selectedDate) {
                const vehicleResponse = await getAbleVehicle(selectedDate.takeDate, selectedDate.returnDate);
                setCars(vehicleResponse.cars || []);
            }
        } catch (error) {
            console.error('차량 정보를 불러오는 중 오류가 발생했습니다.');
            setCars([]);
        } finally {
            setIsDataLoaded(true); // 로딩 종료
        }
    };

    const handleButtonClick = async () => {
        if (!next) {
            setNext(true);
            await fetchCars(); // 다음 단계로 넘어가면 차량 목록을 불러옴
            return;
        }

        if (!selectedDate || !purpose || !selectedCar) {
            console.log('모든 항목을 선택해 주세요.');
            return;
        }

        // 신청 완료 후 다음 단계로 이동
        setFinished(true);
        navigate('/next-step');
    };

    if (!isDataLoaded) return <Loading />;
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
                        <option value="여행">여행</option>
                        <option value="경조사">경조사</option>
                        <option value="학업">학업</option>
                        <option value="업무">업무</option>
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
                    {cars.length === 0 ? (
                        <NoOptionsText>선택 가능한 차량이 없습니다.</NoOptionsText>
                    ) : (
                        cars.map((car) => (
                            <CarOption
                                key={car.id}
                                car={car}
                                selectedCar={selectedCar}
                                onCarSelection={handleCarSelection}
                            />
                        ))
                    )}
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

const NoOptionsText = styled.p`
    text-align: center;
    color: gray;
    margin-top: 20px;
`;
