import React, { useRef } from 'react';
import styled from 'styled-components';
import SubTitle from '../../../components/user/UI/SubTitle';

interface DashboardPhotoUploadProps {
    onUpload: (file: File | null) => void;
    uploaded: boolean;
}

const DashboardPhotoUpload: React.FC<DashboardPhotoUploadProps> = ({ onUpload, uploaded }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onUpload(file);
    };

    return (
        <>
            <SubTitle subTitle="차량 사진 등록" />
            <Container>
                <UploadSection>
                    <UploadBox onClick={handleUploadClick}>
                        <UploadIcon>⬆️</UploadIcon>
                        <UploadText>계기판 사진을 등록해주세요.</UploadText>
                    </UploadBox>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </UploadSection>
                <ProgressSection>
                    <ProgressItem $completed={uploaded}>{uploaded ? '✅' : '⏱️'}</ProgressItem>
                </ProgressSection>
            </Container>
        </>
    );
};

export default DashboardPhotoUpload;

const Container = styled.div`
    width: 100%;
`;

const UploadSection = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const UploadBox = styled.div`
    width: 100%;
    height: 200px;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f9f9f9;
`;

const UploadIcon = styled.div`
    font-size: 50px;
    margin-bottom: 10px;
`;

const UploadText = styled.div`
    font-size: 16px;
`;

const ProgressSection = styled.div`
    display: flex;
    justify-content: center;
`;

const ProgressItem = styled.div<{ $completed: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({ $completed }) => ($completed ? '#FFDD00' : '#fff')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border: 2px solid #ffdd00;
    color: ${({ $completed }) => ($completed ? '#000' : '#FFDD00')};
`;
