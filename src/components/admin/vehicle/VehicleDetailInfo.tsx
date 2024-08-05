import styled from 'styled-components';
import Image from '../basic/Image';
import DateString from '../basic/DateString';

interface VehicleDetailProps {
    vehicleData: {
        imageUrl: string;
        status: string;
        manufacturer: string;
        model: string;
        fuel: string;
        capacity: number;
        registrationDate: string;
    };
}

const VehicleDetailInfo: React.FC<VehicleDetailProps> = ({ vehicleData }) => {
    return (
        <Container>
            <ImageWrapper>
                <Image imageUrl={vehicleData.imageUrl} />
            </ImageWrapper>
            <InfoWrapper>
                <InfoItem>
                    <strong>현재 차량 상태: </strong>{vehicleData.status}
                </InfoItem>
                <InfoItem>
                    <strong>제조회사: </strong>{vehicleData.manufacturer}
                </InfoItem>
                <InfoItem>
                    <strong>모델: </strong>{vehicleData.model}
                </InfoItem>
                <InfoItem>
                    <strong>연료 종류: </strong>{vehicleData.fuel}
                </InfoItem>
                <InfoItem>
                    <strong>탑승 인원: </strong>{vehicleData.capacity}
                </InfoItem>
                <InfoItem>
                    <strong>차량 등록일: </strong>{DateString(vehicleData.registrationDate)}
                </InfoItem>
            </InfoWrapper>
        </Container>
    );
};

export default VehicleDetailInfo;

const Container = styled.div`
    display: flex;
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    margin: 10px 0px;
    border-radius: 0px;
`;

const ImageWrapper = styled.div`
    flex: 1;
    margin-right: 20px;
    width: 100%;
`;

const InfoWrapper = styled.div`
    margin: 0px 0px 0px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const InfoItem = styled.p`
    margin: 15px 0;
    font-size: 17px;

    strong {
        font-weight: bold;
    }
`;
