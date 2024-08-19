import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';
import Guidelines from '../../../components/user/RentReturn/Guidelines';
import VehiclePhotoUpload from '../../../components/user/RentReturn/VehiclePhotoUpload';
import DashboardPhotoUpload from '../../../components/user/RentReturn/DashboardPhotoUpload';
import SpecialNotes from '../../../components/user/RentReturn/SpecialNotes';
import Complite from '../../../components/user/RentReturn/Complite';
import ParkingInput from '../../../components/user/RentReturn/ParkingInput';
import postReport from '../../../API/user/postReport';
import Loading from '../../../components/user/Loading';

// 차량 반납 페이지 컴포넌트
export default function ReturnPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 state
    const [isLoading, setIsLoading] = useState(false); // 로딩 state

    // URL이 변경될 때마다 currentPage를 업데이트
    useEffect(() => {
        const page = parseInt(location.pathname.split('/').pop() || '1', 10);
        setCurrentPage(page);
    }, [location]);

    // 업로드된 사진과 대시보드, 특이사항 메모, 주차 위치를 관리하는 state
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
    const [notes, setNotes] = useState(''); // 특이사항 메모 관리
    const [parkingLoc, setParkingLoc] = useState(''); // 주차 위치 관리

    // 모든 차량 사진이 업로드되었는지 확인
    const allVehiclePhotosUploaded = uploaded.front && uploaded.right && uploaded.back && uploaded.left;

    // 사진 업로드 핸들러
    const handleUpload = (side: 'front' | 'right' | 'back' | 'left', file: File | null) => {
        if (file) {
            setUploaded((prevState) => ({ ...prevState, [side]: true }));
            setPhotos((prevPhotos) => ({ ...prevPhotos, [side]: file }));
        }
    };

    // 대시보드 사진 업로드 핸들러
    const handleDashboardUpload = (file: File | null) => {
        if (file) {
            setUploaded((prevState) => ({ ...prevState, dashboard: true }));
            setPhotos((prevPhotos) => ({ ...prevPhotos, dashboard: file }));
        }
    };

    // 특이사항 메모 변경 핸들러
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    // 주차 위치 입력 변경 핸들러
    const handleParkingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParkingLoc(e.target.value);
    };

    // 데이터를 서버에 제출하는 함수
    const handleSubmit = async () => {
        if (photos.front && photos.right && photos.back && photos.left && photos.dashboard) {
            setIsLoading(true);
            try {
                const response = await postReport(
                    photos.front,
                    photos.right,
                    photos.back,
                    photos.left,
                    photos.dashboard,
                    notes,
                    parkingLoc,
                    'RETURN',
                );
                console.log('API 호출 성공:', response);
                navigate(`/return/6`);
            } catch (error) {
                console.error('데이터 제출 실패:', error);
                alert('데이터 제출에 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // 다음 또는 제출 버튼 클릭 핸들러
    const handleNextOrSubmit = () => {
        if (currentPage === 5) {
            handleSubmit(); // 마지막 페이지에서는 데이터를 제출
        } else if (currentPage < 6) {
            navigate(`/return/${currentPage + 1}`); // 다음 페이지로 이동
        }
    };

    // 이전 버튼 클릭 핸들러
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            navigate(`/return/${currentPage - 1}`); // 이전 페이지로 이동
        }
    };

    // 현재 페이지에 따라 적절한 콘텐츠를 렌더링하는 함수
    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <Guidelines type="return" />;
            case 2:
                return (
                    <VehiclePhotoUpload
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
                return <ParkingInput value={parkingLoc} onChange={handleParkingInputChange} />;
            case 6:
                return <Complite type="return" />;
            default:
                return <SubTitle subTitle="잘못된 접근입니다." />;
        }
    };

    // 로딩 중이면 로딩 컴포넌트를 반환
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            {currentPage !== 6 && <Title title="차량 반납" />}
            {renderContent()}
            {currentPage !== 6 && (
                <ButtonContainer>
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        이전
                    </Button>
                    <Button
                        onClick={handleNextOrSubmit}
                        disabled={
                            (currentPage === 2 && !allVehiclePhotosUploaded) || // 차량 사진이 모두 업로드되지 않으면 비활성화
                            (currentPage === 3 && !uploaded.dashboard) || // 대시보드 사진이 업로드되지 않으면 비활성화
                            (currentPage === 5 && !parkingLoc) // 주차 위치가 입력되지 않으면 비활성화
                        }
                    >
                        {currentPage === 5 ? '제출' : '다음'}
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;
