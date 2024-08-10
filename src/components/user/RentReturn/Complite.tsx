import styled from 'styled-components';
import Check from '../../../img/icon/Check.png';
import Button from '../UI/Button';

export default function Complite() {
    return (
        <CompliteContainer>
            <Img src={Check} />
            <SubTitle>주행 준비가 완료되었어요.</SubTitle>
            <Disc>탈까와 함께 행복한 운전 하세요!</Disc>
            <Button>신청내역 확인</Button>
        </CompliteContainer>
    );
}

const CompliteContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    width: 100px;
`;

const SubTitle = styled.h2`
    margin-top: 10px;
`;

const Disc = styled.p`
    color: gray;
    margin-bottom: 10px;
`;
