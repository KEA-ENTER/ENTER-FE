import React, { useRef } from 'react';
import styled from 'styled-components';
import SubTitle from '../UI/SubTitle';

interface PhotoUploadProps {
    currentStep: number;
    steps: Array<'front' | 'right' | 'back' | 'left'>;
    uploaded: {
        front: boolean;
        right: boolean;
        back: boolean;
        left: boolean;
    };
    onUpload: (side: 'front' | 'right' | 'back' | 'left', file: File | null) => void;
}

const VehiclePhotoUpload: React.FC<PhotoUploadProps> = ({ currentStep, steps, uploaded, onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onUpload(steps[currentStep], file);
    };

    return (
        <>
            <SubTitle subTitle="차량 사진 등록" />
            <Container>
                <UploadSection>
                    <UploadBox onClick={handleUploadClick} $isActive={currentStep < steps.length}>
                        <UploadIcon>⬆️</UploadIcon>
                        <UploadText>차량 {steps[currentStep]} 방향 사진을 등록 해주세요.</UploadText>
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
                    <ProgressItem $completed={uploaded.front}>{uploaded.front ? '✅' : '🚗'}</ProgressItem>
                    <ProgressLine />
                    <ProgressItem $completed={uploaded.right}>{uploaded.right ? '✅' : '🚗'}</ProgressItem>
                    <ProgressLine />
                    <ProgressItem $completed={uploaded.back}>{uploaded.back ? '✅' : '🚗'}</ProgressItem>
                    <ProgressLine />
                    <ProgressItem $completed={uploaded.left}>{uploaded.left ? '✅' : '🚗'}</ProgressItem>
                </ProgressSection>
            </Container>
        </>
    );
};

export default VehiclePhotoUpload;

const Container = styled.div`
    width: 100%;
`;

const UploadSection = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

interface UploadBoxProps {
    $isActive: boolean;
}

const UploadBox = styled.div<UploadBoxProps>`
    width: 100%;
    height: 200px;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${({ $isActive }) => ($isActive ? '#f9f9f9' : '#ddd')};
    pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
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
    align-items: center;
`;

const ProgressItem = styled.div<{ $completed: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({ $completed }) => ($completed ? '#FFDD00' : '#fff')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border: 2px solid #ffdd00;
    color: ${({ $completed }) => ($completed ? '#000' : '#FFDD00')};
`;

const ProgressLine = styled.div`
    width: 50px;
    height: 2px;
    background-color: gray;
`;
