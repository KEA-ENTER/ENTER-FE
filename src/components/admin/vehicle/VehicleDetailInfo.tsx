import styled from 'styled-components';
import Image from '../basic/Image';
import DateString from '../basic/DateString';

interface VehicleDetailProps {
    vehicleInfo: {
        vehicleId: number;
        vehicleNo: string;
        company: string;
        model: string;
        seats: string;
        fuel: string;
        img: string;
        createdAt: string;
        updatedAt: string;
        state: string;
    }
}

// 차량 상세 보기 정보를 보여주는 컴포넌트
const VehicleDetailInfo: React.FC<VehicleDetailProps> = ({ vehicleInfo }) => {
    // 영어로 된 서버값을 한글로 변환한다.
    const getStatusText = (state: string) => {
        if (state === 'AVAILABLE')
            return '사용 가능';
        else if (state === 'ON_RENT')
            return '인수중';
        else if (state == 'UNAVAILABLE')
            return '사용 불가능';
        else
            return '';
    }

    const getFuelText = (fuel: string) => {
        if (fuel === 'DIESEL')
            return '경유';
        else if (fuel === 'GASOLINE')
            return '휘발유';
        else if (fuel == 'ELECTRICITY')
            return '전기';
        else
            return '';
    }

    return (
        <Container>
            <ImageWrapper>
                <Image imageUrl={vehicleInfo.img} />
            </ImageWrapper>
            <InfoWrapper>
                <InfoItem>
                    <strong>현재 차량 상태: </strong>{getStatusText(vehicleInfo.state)}
                </InfoItem>
                <InfoItem>
                    <strong>제조회사: </strong>{vehicleInfo.company}
                </InfoItem>
                <InfoItem>
                    <strong>모델: </strong>{vehicleInfo.model}
                </InfoItem>
                <InfoItem>
                    <strong>연료 종류: </strong>{getFuelText(vehicleInfo.fuel)}
                </InfoItem>
                <InfoItem>
                    <strong>탑승 인원: </strong>{vehicleInfo.seats}
                </InfoItem>
                <InfoItem>
                    <strong>차량 등록일: </strong>{DateString(vehicleInfo.createdAt)}
                </InfoItem>
            </InfoWrapper>
        </Container>
    );
};

export default VehicleDetailInfo;

const Container = styled.div`
    display: flex;
    background: rgba(238, 238, 238, 0.6);
    padding: 10px;
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
