import styled from 'styled-components';

interface Car {
    id: number;
    name: string;
    type: string;
    brand: string;
    capacity: number;
    ratio: string;
    imageUrl: string;
}

const CarOption: React.FC<{
    car: Car;
    selectedCar: Car | null;
    onCarSelection: (car: Car) => void;
}> = ({ car, selectedCar, onCarSelection }) => {
    return (
        <StyledCarOption onClick={() => onCarSelection(car)} $isSelected={selectedCar?.id === car.id}>
            <CarInfo>
                <img src={car.imageUrl} alt={car.name} />
                <CarDetails>
                    <CarName>{`${car.name} / ${car.type} / ${car.brand} / ${car.capacity}인승`}</CarName>
                    <CarRatio>{car.ratio}</CarRatio>
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
