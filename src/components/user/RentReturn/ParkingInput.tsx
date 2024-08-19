import React from 'react';
import styled from 'styled-components';
import SubTitle from '../UI/SubTitle';

// props 인터페이스에서 onChange 타입을 HTMLInputElement로 수정
interface SpecialNotesProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Parking: React.FC<SpecialNotesProps> = ({ value, onChange }) => {
    return (
        <>
            <SubTitle subTitle="차량 주차 위치 등록" />
            <Container>
                <TextInput placeholder="주차 위치를 입력해주세요" value={value} onChange={onChange} />
            </Container>
        </>
    );
};

export default Parking;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    resize: none;
`;
