import React from 'react';
import styled from 'styled-components';
import SubTitle from '../../../components/user/UI/SubTitle';

interface SpecialNotesProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SpecialNotes: React.FC<SpecialNotesProps> = ({ value, onChange }) => {
    return (
        <>
            <SubTitle subTitle="차량 특이사항" />
            <Container>
                <TextArea placeholder="특이사항을 입력해주세요" value={value} onChange={onChange} />
            </Container>
        </>
    );
};

export default SpecialNotes;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    resize: none;
`;
