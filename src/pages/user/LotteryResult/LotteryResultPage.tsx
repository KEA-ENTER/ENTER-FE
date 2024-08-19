import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/user/UI/Button';
import congratulation from '../../../img/icon/congratulation.png';
import sad from '../../../img/icon/sad.png';
import getResult from '../../../API/user/getResult';
import getDetail from '../../../API/user/getDetail';
import Loading from '../../../components/user/Loading';
import deleteApplication from '../../../API/user/deleteApplication';
import useAutoRouting from '../../../utils/useAutoRouting';
import Modal from '../../../components/user/UI/CancelMonal';

export default function LotteryResultPage() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    // State 관리
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [winning, setWinning] = useState<boolean>();
    const [watting, setWatting] = useState<number | null>();
    const [applyId, setApplyId] = useState<number>();

    const [showModal, setShowModal] = useState<boolean>(false);

    // 신청 내역 페이지로 이동
    const toDetail = () => {
        navigate('/detail');
    };

    // 다음 신청일 확인 페이지로 이동
    const toDateInfo = () => {
        navigate('/date-info');
    };

    // 신청 취소
    const handleCancel = () => {
        setShowModal(true); // 모달 표시
    };

    // 모달 닫기 핸들러
    const closeModal = () => {
        setShowModal(false); // 모달 숨기기
    };

    // 모달에서 취소 확인 버튼 클릭 시 호출
    const confirmCancel = async () => {
        setIsLoading(true); // 로딩 상태 활성화
        setShowModal(false); // 모달 숨기기
        try {
            if (typeof applyId === 'number') {
                try {
                    await deleteApplication(applyId); // 신청 삭제 API 호출
                } catch {
                    alert('삭제 실패했습니다.'); // 삭제 실패 시 경고 메시지
                } finally {
                    await autoRoutingFunc(); // 삭제 후 자동 라우팅
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // 로딩 상태 비활성화
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 로딩 상태 활성화
            try {
                const resultData = await getResult(); // 추첨 결과 데이터 호출
                setWinning(resultData.winning); // 당첨 여부 설정
                setWatting(resultData.waitingNumber); // 대기 번호 설정
                const detailData = await getDetail(); // 신청 내역 데이터 호출
                setApplyId(detailData.applyId); // 신청 ID 설정
            } catch (error) {
                console.error('Error fetching lottery result:', error); // 오류 발생 시 콘솔에 로그
            } finally {
                setIsLoading(false); // 로딩 상태 비활성화
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    // 데이터 로딩 중일 때 로딩 컴포넌트 표시
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Modal show={showModal} onClose={closeModal} onConfirm={confirmCancel} />
            {winning ? (
                <>
                    <Img alt="congratulation" src={congratulation} />
                    <Message>차량 추첨에 당첨됐어요!</Message>
                    <div>신청 날짜에 차량을 인수해주세요</div>
                    <div>
                        <Button onClick={toDetail}>신청내역</Button>
                        <Button onClick={handleCancel}>신청취소</Button>
                    </div>
                </>
            ) : watting ? (
                <>
                    <Img alt="sadIcon" src={sad} />
                    <Message>차량 추첨에 미당첨되었어요..</Message>
                    <div>대기 번호는 {watting}번 이에요</div>
                    <Button onClick={handleCancel}>신청취소</Button>
                </>
            ) : (
                <>
                    <Img alt="sadIcon" src={sad} />
                    <Message>차량 추첨에 미당첨되었어요..</Message>
                    <Button onClick={toDateInfo}>다음 신청일 확인</Button>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    width: 100px;
    margin: 30px;
`;

const Message = styled.h2`
    font-size: 22px;
`;
