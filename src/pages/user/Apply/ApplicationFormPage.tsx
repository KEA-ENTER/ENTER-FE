import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';

import RadioButtonOption from '../../../components/user/Apply/RadioButtonOption';
import CarOption from '../../../components/user/Apply/CarOption';
import FinishedPage from './FinishedPage';

import getAppliesDate from '../../../API/user/getAppliesDate';
import getAbleVehicle from '../../../API/user/getAbleVehicle';
import applyVehicel from '../../../API/user/applyVehicel';
import Loading from '../../../components/user/Loading';

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

    const [next, setNext] = useState<boolean>(false);

    const [purpose, setPurpose] = useState<string>('TRAVEL'); // 사용 목적
    const [selectedDate, setSelectedDate] = useState<DateOption | null>(null); // 탑승일
    const [selectedCar, setSelectedCar] = useState<Car | null>(null); // 탑승할 차량
    const [applyRoundId, setApplyRoundId] = useState<number | null>(null); // 선택한 차량의 applyRoundId

    const [dates, setDates] = useState<DateOption[]>([]); // API response
    const [cars, setCars] = useState<Car[]>([]); // API response

    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateResponse = await getAppliesDate(); // API 호출 함수 사용
                console.log(dateResponse);
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

    const handleCarSelection = (car: Car) => {
        setSelectedCar(car);
        setApplyRoundId(car.applyRoundId); // 선택한 차량의 applyRoundId를 저장
    };

    const fetchCars = async () => {
        try {
            setIsDataLoaded(false); // 로딩 시작
            if (selectedDate) {
                const vehicleResponse = await getAbleVehicle(selectedDate.takeDate, selectedDate.returnDate);
                console.log('vehicleResponse', vehicleResponse);
                setCars(vehicleResponse || []);
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
        setIsDataLoaded(false);
        try {
            // 차량 신청 API 호출
            const response = await applyVehicel(applyRoundId as number, purpose);
            console.log('차량 신청 응답:', response);

            if (response.code === 'APPLY-001') {
                alert('만 26세 이하는 이용이 불가능합니다.');
                navigate('/mypage');
                return;
            }

            // 신청 완료 후 다음 단계로 이동
        } catch (error) {
            console.error('차량 신청 중 오류가 발생했습니다.', error);
            return;
        } finally {
            setFinished(true);
            setIsDataLoaded(true);
        }
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
    max-height: 430px; /* 고정된 높이 설정 */
    overflow-y: auto; /* 세로 스크롤 가능 */
    margin-bottom: 20px;
`;

const NoOptionsText = styled.p`
    text-align: center;
    color: gray;
    margin-top: 20px;
`;
