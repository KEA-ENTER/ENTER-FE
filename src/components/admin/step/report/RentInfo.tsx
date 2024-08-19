import styled from 'styled-components';
import Image from '../../basic/Image';
import DateString from '../../basic/DateString';

interface VehicleInfo {
    rentData: {
        reportId: number;
        memberId: number;
        takeDate: string;
        returnDate: string;
        reportTime: string;
        memberName: string;
        reportImageList: {
            dashboardImg: string;
            frontImg: string;
            backImg: string;
            leftImg: string;
            rightImg: string;
        };
        vehicleNote: string;
    };
}

// 인수 보고서 내용
const RentInfo: React.FC<VehicleInfo> = ({ rentData }) => {
    return (
        <Container>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>{`사용 일자: ${DateString(rentData.takeDate)} ~ ${DateString(
                        rentData.returnDate,
                    )}`}</InfoItem>
                    <InfoItem>{`사용자 이름: ${rentData.memberName}`}</InfoItem>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>{`보고 시간: ${DateString(rentData.reportTime)}`}</InfoItem>
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>계기판 사진</InfoItem>
                    <ImageContainer>
                        <Image imageUrl={rentData.reportImageList.dashboardImg} />
                    </ImageContainer>
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>차량 사진</InfoItem>
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>전면부</InfoItem>
                    <ImageContainer>
                        <Image imageUrl={rentData.reportImageList.frontImg} />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>후면부</InfoItem>
                    <ImageContainer>
                        <Image imageUrl={rentData.reportImageList.backImg} />
                    </ImageContainer>
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>측면부</InfoItem>
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <ImageContainer>
                        <Image imageUrl={rentData.reportImageList.leftImg} />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                    <ImageContainer>
                        <Image imageUrl={rentData.reportImageList.rightImg} />
                    </ImageContainer>
                </HalfWrapper>
            </InfoWrapper>
            <InfoItem>특이사항</InfoItem>
            <NoteContainer>{rentData.vehicleNote}</NoteContainer>
        </Container>
    );
};

export default RentInfo;

const Container = styled.div`
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    margin: 10px 0px;
    border-radius: 0px;
`;

const HalfWrapper = styled.div`
    width: 50%;
`;

const InfoWrapper = styled.div`
    margin: 0px 0px 0px 0px;
    display: flex;
    width: 100%;
`;

const InfoItem = styled.div`
    margin: 15px 0;
    font-size: 17px;
`;

const ImageContainer = styled.div`
    height: 180px;
`;

const NoteContainer = styled.table`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;