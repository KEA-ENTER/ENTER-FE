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

    const [next, setNext] = useState<boolean>(false); //다음 페이지 전환

    const [pastApplyId, setPastApplyId] = useState();

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
                const getDetailResponse = await getDetail(); //이전에 신청한 신청서가 있는지 확인
                if (getDetailResponse != null) {
                    setPastApplyId(getDetailResponse.applyId); //이전에 신청한 신청서 ID 저장
                }
                const dateResponse = await getAppliesDate(); // 신청 가능 일자 호출 API
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
                setCars(vehicleResponse || []);
            }
        } catch (error) {
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
            alert('모든 항목을 선택해 주세요.');
            return;
        }
        setIsDataLoaded(false);
        try {
            // 차량 신청 API
            let response;
            if (pastApplyId) {
                //이전 신청 내역이 있을 경우
                response = await patchApplyVehicel(pastApplyId, applyRoundId as number, purpose);
            } else {
                //이전 신청 내역이 없을 경우
                response = await applyVehicel(applyRoundId as number, purpose);
            }

            if (response.code === 'APPLY-001') {
                alert('만 26세 이하는 이용이 불가능합니다.');
                navigate('/mypage');
                return;
            }
        } catch (error) {
            console.error('차량 신청 중 오류가 발생했습니다.', error);
            return;
        } finally {
            autoRoutingFunc();
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
