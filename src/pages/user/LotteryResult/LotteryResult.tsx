import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../../components/user/UI/Button';
import congratulation from '../../../img/icon/congratulation.png';
import sad from '../../../img/icon/sad.png';

interface Response {
    state: number;
    waitting: number | null;
}

export default function LotteryResult() {
    const [state, setState] = useState<number>();
    const [watting, setWatting] = useState<number | null>(3);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get<Response>('/result');
    //             setState(response.data.state);
    //             setWatting(response.data.waitting);
    //         } catch (error) {
    //             console.error('Error fetching lottery result:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    if (state === 1) {
        return (
            <Container>
                <Img alt="congratulation" src={congratulation} />
                <Message>차량 추첨에 당첨됐어요!</Message>
                <div>신청 날짜에 차량을 인수해주세요</div>
                <div>
                    <Button>신청내역</Button>
                    <Button>신청취소</Button>
                </div>
            </Container>
        );
    } else if (state === 2) {
        return (
            <Container>
                <Img alt="sadIcon" src={sad} />
                <Message>차량 추첨에 미당첨되었어요..</Message>
                <div>대기 번호는 {watting}번 이에요</div>
                <Button>신청취소</Button>
            </Container>
        );
    }
    return (
        <Container>
            <Img alt="sadIcon" src={sad} />
            <Message>차량 추첨에 미당첨되었어요..</Message>
            <Button>다음 신청일 확인</Button>
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
    // border: 1px solid red;
`;

const Img = styled.img`
    width: 100px;
    margin: 30px;
`;

const Message = styled.h2`
    font-size: 22px;
`;
