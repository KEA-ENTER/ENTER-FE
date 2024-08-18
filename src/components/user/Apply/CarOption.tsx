import styled from 'styled-components';

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

const CarOption: React.FC<{
    car: Car;
    selectedCar: Car | null;
    onCarSelection: (car: Car) => void;
}> = ({ car, selectedCar, onCarSelection }) => {
    return (
        <StyledCarOption onClick={() => onCarSelection(car)} $isSelected={selectedCar?.vehicleId === car.vehicleId}>
            <CarInfo>
                <CarImg src={car.img} alt={car.model} />
                <CarDetails>
                    <CarName>{`${car.model} / ${car.fuel} / ${car.company} / ${car.seat}인승`}</CarName>
                    <CarRatio>1 : {car.competition}</CarRatio>
                </CarDetails>
            </CarInfo>
        </StyledCarOption>
    );
};

export default CarOption;

const StyledCarOption = styled.div<{ $isSelected?: boolean }>`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 100px;
    border: ${({ $isSelected }) => ($isSelected ? '2px' : '1px')} solid
        ${({ $isSelected }) => ($isSelected ? '#FEE500' : 'black')};
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;

const CarInfo = styled.div`
    display: flex;
    align-items: center;
`;

const CarImg = styled.img`
    max-width: 100px;
`;

const CarDetails = styled.div`
    margin-left: 10px;
`;

const CarName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const CarRatio = styled.div`
    font-size: 14px;
    color: #555;
`;
