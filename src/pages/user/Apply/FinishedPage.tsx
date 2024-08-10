import styled from 'styled-components';
import congratulation from '../../../img/icon/congratulation.png';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';

export default function FinishedPage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/detail/:id'); //링크 수정 필요
    };

    return (
        <FinishedContainer>
            <Img src={congratulation} alt="congratulationImg" />
            <SubTitle>신청이 완료되었어요!</SubTitle>
            <Disc>결과는 수요일에 이메일로 확인 가능해요.</Disc>
            <Button onClick={handleButtonClick}>신청내역 확인하기</Button>
        </FinishedContainer>
    );
}

const FinishedContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    width: 110px;
    height: auto;
    margin: 10px;
`;

const SubTitle = styled.h2`
    margin-top: 10px;
`;

const Disc = styled.p`
    color: gray;
    margin-bottom: 10px;
`;
