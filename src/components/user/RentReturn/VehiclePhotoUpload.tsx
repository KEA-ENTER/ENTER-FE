import React, { useRef } from 'react';
import styled from 'styled-components';
import SubTitle from '../UI/SubTitle';

interface PhotoUploadProps {
    uploaded: {
        front: boolean;
        right: boolean;
        back: boolean;
        left: boolean;
    };
    onUpload: (side: 'front' | 'right' | 'back' | 'left', file: File | null) => void;
}

const VehiclePhotoUpload: React.FC<PhotoUploadProps> = ({ uploaded, onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 업로드 박스를 클릭했을 때 파일 선택 창을 여는 함수
    const handleUploadClick = () => fileInputRef.current?.click();

    // 파일이 선택되었을 때 호출되는 함수
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        const stepKeys: Array<'front' | 'right' | 'back' | 'left'> = ['front', 'right', 'back', 'left'];
        const currentStep = stepKeys.findIndex((key) => !uploaded[key]);
        if (currentStep !== -1) {
            onUpload(stepKeys[currentStep], file);
        }
    };

    const stepKeys: Array<'front' | 'right' | 'back' | 'left'> = ['front', 'right', 'back', 'left'];
    const currentStep = stepKeys.findIndex((key) => !uploaded[key]);

    return (
        <>
            <SubTitle subTitle={`차량 ${stepKeys[currentStep]} 사진 업로드`} />
            <UploadContainer>
                <UploadBox onClick={handleUploadClick}>
                    <UploadText>{`차량 ${stepKeys[currentStep]} 사진을 업로드 해주세요.`}</UploadText>
                </UploadBox>
                <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </UploadContainer>
            <ProgressContainer>
                {stepKeys.map((key, index) => (
                    <React.Fragment key={key}>
                        <ProgressItem $completed={uploaded[key] ? true : undefined}>
                            {uploaded[key] ? '✅' : '🚗'}
                        </ProgressItem>
                        {index < stepKeys.length - 1 && <ProgressLine />}
                    </React.Fragment>
                ))}
            </ProgressContainer>
        </>
    );
};

export default VehiclePhotoUpload;

const UploadContainer = styled.div`
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

const UploadText = styled.div`
    font-size: 16px;
    text-align: center;
`;

const ProgressContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProgressItem = styled.div<{ $completed?: boolean }>`
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

const HiddenInput = styled.input`
    display: none;
`;
