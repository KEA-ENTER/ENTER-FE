import { useState, useEffect } from 'react';
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
import postReport from '../../../API/user/postReport';
import Loading from '../../../components/user/Loading';

export default function RentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // URL이 변경될 때마다 currentPage를 업데이트
    useEffect(() => {
        const page = parseInt(location.pathname.split('/').pop() || '1', 10);
        setCurrentPage(page);
    }, [location]);

    // 업로드된 사진을 관리하는 state
    const [photos, setPhotos] = useState({
        front: null as File | null,
        right: null as File | null,
        back: null as File | null,
        left: null as File | null,
        dashboard: null as File | null,
    });

    // 특이사항 메모 관리 state
    const [notes, setNotes] = useState('');

    // 사진 업로드 핸들러
    const handleUpload = (side: keyof typeof photos, file: File | null) => {
        setPhotos((prev) => ({ ...prev, [side]: file }));
    };

    // 다음 버튼 핸들러
    const handleNext = () => {
        if (currentPage < 5) {
            navigate(`/rent/${currentPage + 1}`);
        }
    };

    // 이전 버튼 핸들러
    const handlePrevious = () => {
        if (currentPage > 1) {
            navigate(`/rent/${currentPage - 1}`);
        }
    };

    // API 호출을 통해 데이터를 전송하는 함수
    const submitData = async () => {
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
                    '',
                    'TAKE',
                );
                console.log('API 호출 성공:', response);
                navigate(`/rent/5`);
            } catch (error) {
                console.error('데이터 제출 실패:', error);
                alert('데이터 제출에 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // 다음 버튼 비활성화 조건
    const isNextButtonDisabled = () => {
        if (currentPage === 2) {
            return !Object.values(photos).slice(0, 4).every(Boolean); // 4개의 차량 사진이 모두 업로드되지 않았으면 비활성화
        } else if (currentPage === 3) {
            return !photos.dashboard; // 대시보드 사진이 업로드되지 않았으면 비활성화
        } else {
            return false;
        }
    };

    // 현재 페이지에 따라 적절한 콘텐츠를 렌더링
    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <Guidelines type="rent" />;
            case 2:
                return (
                    <VehiclePhotoUpload
                        uploaded={{
                            front: Boolean(photos.front),
                            right: Boolean(photos.right),
                            back: Boolean(photos.back),
                            left: Boolean(photos.left),
                        }}
                        onUpload={(side, file) => handleUpload(side as keyof typeof photos, file)}
                    />
                );
            case 3:
                return (
                    <DashboardPhotoUpload
                        uploaded={!!photos.dashboard}
                        onUpload={(file) => handleUpload('dashboard', file)}
                    />
                );
            case 4:
                return <SpecialNotes value={notes} onChange={(e) => setNotes(e.target.value)} />;
            case 5:
                return <Complite type="rent" />;
            default:
                return <SubTitle subTitle="잘못된 접근입니다." />;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            {currentPage !== 5 && <Title title="차량 대여" />}
            {renderContent()}
            {currentPage !== 5 && (
                <ButtonContainer>
                    <Button onClick={handlePrevious} disabled={currentPage === 1}>
                        이전
                    </Button>
                    <Button onClick={currentPage === 4 ? submitData : handleNext} disabled={isNextButtonDisabled()}>
                        {currentPage === 4 ? '제출' : '다음'}
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
