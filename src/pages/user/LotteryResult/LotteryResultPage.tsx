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

export default function LotteryResultPage() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting(); // 커스텀 훅 사용

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [winning, setWinning] = useState<boolean>();
    const [watting, setWatting] = useState<number | null>();
    const [applyId, setApplyId] = useState<number>();

    const toDetail = () => {
        navigate('/detail');
    };

    const toDateInfo = () => {
        navigate('/date-info');
    };

    const cancelApply = async () => {
        const userConfirmed = window.confirm('정말 취소할까요?');
        if (userConfirmed) {
            setIsLoading(true);
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
                sessionStorage.removeItem('autoRoutingPage');
                setIsLoading(false);
            }
        }
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

    if (winning) {
        return (
            <Container>
                <Img alt="congratulation" src={congratulation} />
                <Message>차량 추첨에 당첨됐어요!</Message>
                <div>신청 날짜에 차량을 인수해주세요</div>
                <div>
                    <Button onClick={toDetail}>신청내역</Button>
                    <Button onClick={cancelApply}>신청취소</Button>
                </div>
            </Container>
        );
    } else if (watting) {
        return (
            <Container>
                <Img alt="sadIcon" src={sad} />
                <Message>차량 추첨에 미당첨되었어요..</Message>
                <div>대기 번호는 {watting}번 이에요</div>
                <Button onClick={cancelApply}>신청취소</Button>
            </Container>
        );
    } else {
        return (
            <Container>
                <Img alt="sadIcon" src={sad} />
                <Message>차량 추첨에 미당첨되었어요..</Message>
                <Button onClick={toDateInfo}>다음 신청일 확인</Button>
            </Container>
        );
    }
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
