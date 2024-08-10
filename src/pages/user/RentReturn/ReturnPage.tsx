import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';
import Guidelines from '../../../components/user/RentReturn/Guidelines';
import VehiclePhotoUpload from '../../../components/user/RentReturn/VehiclePhotoUpload';
import DashboardPhotoUpload from '../../../components/user/RentReturn/DashboardPhotoUpload';
import SpecialNotes from '../../../components/user/RentReturn/SpecialNotes';
import Complite from '../../../components/user/RentReturn/Complite';

export default function RentPage() {
    const navigate = useNavigate();
    const { page } = useParams<{ page: string }>();
    const currentPage = parseInt(page || '1', 10);

    const [uploaded, setUploaded] = useState({
        front: false,
        right: false,
        back: false,
        left: false,
        dashboard: false,
    });
    const [photos, setPhotos] = useState<{ [key in 'front' | 'right' | 'back' | 'left' | 'dashboard']?: File | null }>(
        {},
    );
    const [notes, setNotes] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const steps: Array<'front' | 'right' | 'back' | 'left'> = ['front', 'right', 'back', 'left'];

    const allVehiclePhotosUploaded = uploaded.front && uploaded.right && uploaded.back && uploaded.left;
    const allPhotosUploaded = allVehiclePhotosUploaded && uploaded.dashboard;

    const handleUpload = (side: 'front' | 'right' | 'back' | 'left', file: File | null) => {
        if (file) {
            setUploaded((prevState) => ({ ...prevState, [side]: true }));
            setPhotos((prevPhotos) => ({ ...prevPhotos, [side]: file }));
            setCurrentStep(currentStep + 1);
        }
    };

    const handleDashboardUpload = (file: File | null) => {
        if (file) {
            setUploaded((prevState) => ({ ...prevState, dashboard: true }));
            setPhotos((prevPhotos) => ({ ...prevPhotos, dashboard: file }));
        }
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        Object.keys(photos).forEach((key) => {
            if (photos[key as keyof typeof photos]) {
                formData.append(key, photos[key as keyof typeof photos] as File);
            }
        });

        formData.append('notes', notes);

        try {
            // axios를 사용하여 POST 요청 전송
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                navigate(`/rent/${currentPage + 1}`);
            } else {
                console.error('서버 오류:', response.statusText);
                alert('데이터 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('네트워크 오류:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    };

    const handleNextOrSubmit = () => {
        if (currentPage === 4) {
            handleSubmit();
        } else if (currentPage < 5) {
            navigate(`/rent/${currentPage + 1}`);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            navigate(`/rent/${currentPage - 1}`);
        }
    };

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <Guidelines />;
            case 2:
                return (
                    <VehiclePhotoUpload
                        currentStep={currentStep}
                        steps={steps}
                        uploaded={{
                            front: uploaded.front,
                            right: uploaded.right,
                            back: uploaded.back,
                            left: uploaded.left,
                        }}
                        onUpload={handleUpload}
                    />
                );
            case 3:
                return <DashboardPhotoUpload uploaded={uploaded.dashboard} onUpload={handleDashboardUpload} />;
            case 4:
                return <SpecialNotes value={notes} onChange={handleNotesChange} />;
            case 5:
                return <Complite />;
            default:
                return <SubTitle subTitle="잘못된 접근입니다." />;
        }
    };

    if (currentPage === 5) {
        return <Complite />;
    }

    return (
        <Container>
            <Title title="차량 대여" />
            {renderContent()}
            <ButtonContainer>
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    이전
                </Button>
                <Button
                    onClick={handleNextOrSubmit}
                    disabled={(currentPage === 2 && !allPhotosUploaded) || (currentPage === 3 && !uploaded.dashboard)}
                >
                    {currentPage === 4 ? '제출' : '다음'}
                </Button>
            </ButtonContainer>
        </Container>
    );
}

// 스타일 컴포넌트
const Container = styled.div`
    width: 100%;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;
