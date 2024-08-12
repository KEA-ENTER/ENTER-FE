import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../../basic/Image';
import DateString from '../../basic/DateString';
import RentReportModel from '../model/RentReportModel';
import { useParams } from 'react-router-dom';

interface VehicleInfo {
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
}

const ReportInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [rentData, setRentData] = useState<VehicleInfo | undefined>(undefined);

    useEffect(() => {
        const fetchRentData = async () => {
            const res = await RentReportModel(id || '-1');
            if (res) {
                setRentData(res);
            }
        };
        fetchRentData();
    }, [id]);

    if (!rentData) {
        return <Container>보고서가 존재하지 않습니다.</Container>;
    }

    return (
        <Container>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>{`사용 일자: ${DateString(rentData.reportTime)} ~ ${DateString(rentData.returnDate)}`}</InfoItem>
                    <InfoItem>{`사용자 이름: ${rentData.memberName}`}</InfoItem>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>{`보고 시간: ${DateString(rentData.reportTime)}`}</InfoItem>
                    <InfoItem>{`주차 위치: ${rentData.memberName}`}</InfoItem>   
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
