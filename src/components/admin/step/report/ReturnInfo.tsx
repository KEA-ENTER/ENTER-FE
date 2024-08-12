import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../../basic/Image';
import DateString from '../../basic/DateString';
import { useParams } from 'react-router-dom';
import ReturnReportModel from '../model/ReturnReportModel';

interface VehicleInfo {
    reportId: number;
    memberId: number;
    takeDate: string;
    returnDate: string;
    reportTime: string;
    parkingLoc: string;
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

const ReturnInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [returnData, setReturnData] = useState<VehicleInfo | undefined>(undefined);

    useEffect(() => {
        const fetchReturnData = async () => {
            const res = await ReturnReportModel(id || '-1');
            if (res) {
                setReturnData(res);
            }
        };
        fetchReturnData();
    }, [id]);

    if (!returnData) {
        return <Container>보고서가 존재하지 않습니다.</Container>;
    }

    return (
        <Container>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>{`사용 일자: ${DateString(returnData.reportTime)} ~ ${DateString(returnData.returnDate)}`}</InfoItem>
                    <InfoItem>{`사용자 이름: ${returnData.memberName}`}</InfoItem>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>{`보고 시간: ${DateString(returnData.reportTime)}`}</InfoItem>
                    <InfoItem>{`주차 위치: ${returnData.parkingLoc}`}</InfoItem>   
                </HalfWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <HalfWrapper>
                    <InfoItem>계기판 사진</InfoItem>  
                    <ImageContainer>
                        <Image imageUrl={returnData.reportImageList.dashboardImg} />
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
                        <Image imageUrl={returnData.reportImageList.frontImg} />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                    <InfoItem>후면부</InfoItem>
                    <ImageContainer>
                        <Image imageUrl={returnData.reportImageList.backImg} />
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
                        <Image imageUrl={returnData.reportImageList.leftImg} />
                    </ImageContainer>
                </HalfWrapper>
                <HalfWrapper>
                    <ImageContainer>
                        <Image imageUrl={returnData.reportImageList.rightImg} />
                    </ImageContainer>
                </HalfWrapper>
            </InfoWrapper>
        </Container>
    );
};

export default ReturnInfo;

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
