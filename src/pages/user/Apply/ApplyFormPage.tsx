import { useState, useEffect, useRef, ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';
import CheckBoxOption from './CheckBoxOption';
import CarOption from './CarOption';
import Finished from './Finished';

interface Car {
    id: number;
    name: string;
    type: string;
    brand: string;
    capacity: number;
    ratio: string;
    imageUrl: string;
}

const DUMMY_CARS: Car[] = [
    {
        id: 1,
        name: '아이오닉5',
        type: '전기',
        brand: '현대',
        capacity: 5,
        ratio: '17:1',
        imageUrl: 'https://example.com/ionic5.jpg',
    },
    {
        id: 2,
        name: 'GV80',
        type: '휘발유',
        brand: '현대',
        capacity: 5,
        ratio: '17:1',
        imageUrl: 'https://example.com/gv80.jpg',
    },
    {
        id: 3,
        name: '기블리',
        type: '휘발유',
        brand: '마세라티',
        capacity: 5,
        ratio: '17:1',
        imageUrl: 'https://example.com/gibli.jpg',
    },
    {
        id: 4,
        name: 'GT-R',
        type: '휘발유',
        brand: '닛산',
        capacity: 4,
        ratio: '17:1',
        imageUrl: 'https://example.com/gtr.jpg',
    },
];

export default function ApplyFormPage() {
    const [purpose, setPurpose] = useState<string>('여행'); //사용 목적
    const [next, setNext] = useState<boolean>(false);
    const [selectedDates, setSelectedDates] = useState<string[]>([]); //탑승일
    const [selectedCar, setSelectedCar] = useState<Car | null>(null); //탑승할 차량
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(true);
    const datesRef = useRef<string[]>([]);
    const carsRef = useRef<Car[]>(DUMMY_CARS);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateResponse = await axios.get('/api/dates');
                datesRef.current = dateResponse.data.dates || ['24.07.20~21 (토, 일)', '24.07.25 (목)'];

                const carResponse = await axios.get('/api/cars');
                carsRef.current = carResponse.data.cars || DUMMY_CARS;
            } catch (error) {
                console.log('서버에서 데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setIsDataLoaded(true);
            }
        };

        fetchData();
    }, []);

    const handleDateChange = (date: string) => {
        setSelectedDates((prevDates) =>
            prevDates.includes(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
        );
    };

    const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPurpose(event.target.value);
    };

    const handleCarSelection = (car: Car) => {
        setSelectedCar(car);
    };

    const handleButtonClick = async () => {
        if (!next) {
            setNext(true);
            return;
        }

        if (selectedDates.length === 0 || !purpose || !selectedCar) {
            console.log('모든 항목을 선택해 주세요.');
            return;
        }

        try {
            await axios.post('/api/license', {
                selectedDates,
                purpose,
                selectedCarId: selectedCar.id,
            });
            setFinished(true);
            navigate('/next-step');
        } catch (error) {
            console.log('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    if (!isDataLoaded) {
        return <div>로딩 중...</div>;
    } else if (finished) {
        return <Finished />;
    }

    return (
        <Container>
            <Title title="차량 신청" />

            {!next ? (
                <>
                    <SubTitle subTitle="탑승일을 선택해주세요." />
                    {datesRef.current.map((date, index) => (
                        <MemoizedCheckBoxOption
                            key={index}
                            date={date}
                            isSelected={selectedDates.includes(date)}
                            onDateChange={handleDateChange}
                        />
                    ))}

                    <SubTitle subTitle="사용 목적을 선택해주세요." />
                    <Select value={purpose} onChange={handlePurposeChange}>
                        <option value="여행">여행</option>
                        <option value="경조사">경조사</option>
                        <option value="학업">학업</option>
                        <option value="업무">업무</option>
                    </Select>

                    <ButtonContainer>
                        <Button onClick={handleButtonClick} disabled={selectedDates.length === 0}>
                            다음
                        </Button>
                    </ButtonContainer>
                </>
            ) : (
                <>
                    <SubTitle subTitle="탑승할 차량을 선택해주세요" />
                    {carsRef.current.map((car) => (
                        <MemoizedCarOption
                            key={car.id}
                            car={car}
                            selectedCar={selectedCar}
                            onCarSelection={handleCarSelection}
                        />
                    ))}
                    <ButtonContainer>
                        <Button onClick={handleButtonClick}>신청하기</Button>
                    </ButtonContainer>
                </>
            )}
        </Container>
    );
}

const MemoizedCarOption = memo(CarOption);
const MemoizedCheckBoxOption = memo(CheckBoxOption);

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
    background-color: #fff;
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
