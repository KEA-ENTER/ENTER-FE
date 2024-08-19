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
import Modal from '../../../components/user/UI/CancelMonal'; // 모달 컴포넌트 경로에 맞게 수정

export default function LotteryResultPage() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [winning, setWinning] = useState<boolean>();
    const [watting, setWatting] = useState<number | null>();
    const [applyId, setApplyId] = useState<number>();

    const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태

    const toDetail = () => {
        navigate('/detail');
    };

    const toDateInfo = () => {
        navigate('/date-info');
    };

    const handleCancel = () => {
        setShowModal(true); // 모달 표시
    };

    const confirmCancel = async () => {
        setIsLoading(true);
        setShowModal(false); // 모달 숨기기
        try {
            if (typeof applyId === 'number') {
                try {
                    await deleteApplication(applyId);
                } catch {
                    alert('삭제 실패했습니다.');
                } finally {
                    await autoRoutingFunc();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false); // 모달 숨기기
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const resultData = await getResult();
                setWinning(resultData.winning);
                setWatting(resultData.waitingNumber);
                const detailData = await getDetail();
                setApplyId(detailData.applyId);
            } catch (error) {
                console.error('Error fetching lottery result:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
