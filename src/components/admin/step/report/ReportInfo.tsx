import React from 'react';
import styled from 'styled-components';
import Image from '../../basic/Image';

interface VehicleInfoProps {
    vehicleInfo: {
        imageUrl: string;
        status: string;
        manufacturer: string;
        model: string;
        fuel: string;
        capacity: number;
        registrationDate: string;
    };
}

const ReportInfo: React.FC<VehicleInfoProps> = ({ vehicleInfo }) => {
    return (
        <Container>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>사용 일자{vehicleInfo.model}</InfoItem>
                    <InfoItem>사용자 이름</InfoItem>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>보고 시간</InfoItem>
                    <InfoItem>주차 위치</InfoItem>   
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>계기판 사진</InfoItem>  
                    <ImageContainer>
                        <Image imageUrl='' />
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
                        <Image imageUrl='' />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>후면부</InfoItem>
                    <ImageContainer>
                        <Image imageUrl='' />
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
                        <Image imageUrl='' />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                <ImageContainer>
                        <Image imageUrl='' />
                    </ImageContainer>
                </HalfWrapper>
            </InfoWrapper>
        </Container>
    );
};

export default ReportInfo;

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