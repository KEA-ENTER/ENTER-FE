import styled from 'styled-components';
import Check from '../../../img/icon/Check.png';
import Button from '../UI/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CompliteProps {
    type: 'rent' | 'return';
}

const Complite: React.FC<CompliteProps> = ({ type }) => {
    const navigate = useNavigate();

    const toDetail = () => {
        navigate('/detail');
    };

    return (
        <CompliteContainer>
            <Img src={Check} />
            <SubTitle>{type === 'rent' ? '주행 준비가 완료되었어요' : '차량 반납이 완료되었어요'}</SubTitle>
            <Disc>{type === 'rent' ? '탈까와 함께 행복한 운전 하세요!' : '행복한 주행이었길 바라요!'}</Disc>
            {type === 'rent' ? <Button onClick={toDetail}>신청내역 확인</Button> : null}
        </CompliteContainer>
    );
};

export default Complite;

const CompliteContainer = styled.div`
    width: 100%;
    height: 500px;
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
