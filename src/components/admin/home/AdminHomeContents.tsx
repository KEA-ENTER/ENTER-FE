import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeAppliesModel from '../../../API/admin/home/HomeAppliesModel';
import HomeTakesModel from '../../../API/admin/home/HomeTakesModel';

interface Takes {
    applyRound: number;
    applyCnt: number;
    takeCnt: number;
    noShowCnt: number;
}

interface Applies {
    round: number;
    applyCnt: number;
    winningCnt: number;
    cancelCnt: number;
}

// 관리자 홈 화면의 응모, 인수 현황 등 데이터를 보여주는 부분
export default function AdminHomeContents() {
    const [todayDate, setTodayDate] = useState('');
    const [todayState, setTodayState] = useState('');
    const [rentDate, setRentDate] = useState('0');
    const [returnDate, setReturnDate] = useState('0');
    const [takesData, setTakesData] = useState<Takes>({applyRound: 0, applyCnt: 0, takeCnt: 0, noShowCnt: 0});
    const [appliesData, setAppliesData] = useState<Applies>({round: 0, applyCnt: 0, winningCnt: 0, cancelCnt: 0});

    // 렌더링 시 날짜를 받아오고 현재 요일의 상태를 표시한다.
    useEffect(() => {
        getDate();
    }, [])

    // 응모, 인수 현황 API를 호출한다.
    useEffect(() => {
        HomeAppliesModel().then(res => {
            if (res) {
                setAppliesData(res);
            }
        });
        HomeTakesModel().then(res => {
            if (res) {
                setTakesData(res);
            }
        });
    }, []);

    // 자바스크립트의 Date() 객체를 바탕으로 현재 요일의 상태를 저장한다.
    const getDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const date = d.getDate();
        let day = '';

        // 요일 정보를 바탕으로 추첨과 재배정 기간이 정해지므로, 그 일정들을 정해준다.
        switch (d.getDay()) {
            case 0:
                day = '일';
                setTodayState('재배정');
                setRentDate('-1');
                setReturnDate('+3');
                break;
            case 1:
                day = '월';
                setTodayState('신청');
                setRentDate('-Day');
                setReturnDate('-3');
                break;
            case 2:
                day = '화';
                setTodayState('신청');
                setRentDate('+1');
                setReturnDate('-2');
                break;
            case 3:
                day = '수';
                setTodayState('추첨 및 발표');
                setRentDate('-5');
                setReturnDate('-1');
                break;    
            case 4:
                day = '목';
                setTodayState('재배정');
                setRentDate('-4');
                setReturnDate('+Day');
                break;
            case 5:
                day = '금';
                setTodayState('재배정');
                setRentDate('-3');
                setReturnDate('+1');
                break;
            case 6:
                day = '토';
                setTodayState('재배정');
                setRentDate('-2');
                setReturnDate('+2');
                break;
            default:
                day = '';
        }
        setTodayDate(`${year}. ${month}. ${date} (${day})`);
    }

    return (
        <Container>
            <DateContainer>
                <DateData>
                    <DateItem>
                    {todayDate}
                    </DateItem>
                    <DateItem>
                    {`${todayState} 기간입니다.`}
                    </DateItem>
                </DateData>
                <DateData>
                <DateItem>
                    {`신청 기간: D${rentDate}`}
                </DateItem>
                <DateItem>
                    {`재배정 기간: D${returnDate}`}
                    </DateItem>
                </DateData>
            </DateContainer>
            <StateData>
                {`응모 현황`}
                <StateContents>
                    <StateItem>{`${appliesData?.round}회차`}</StateItem>
                    <StateItem>{`${appliesData?.applyCnt}명 신청`}</StateItem>
                    <StateItem>{`${appliesData?.winningCnt}명 배정`}</StateItem>
                    <StateItem>{`${appliesData?.cancelCnt}명 취소`}</StateItem>
                </StateContents>
            </StateData>
            <StateData>
                {`인수 현황`}
                <StateContents>
                    <StateItem>{`${takesData?.applyRound}회차`}</StateItem>
                    <StateItem>{`${takesData?.applyCnt}명 신청`}</StateItem>
                    <StateItem>{`${takesData?.takeCnt}명 인수`}</StateItem>
                    <StateItem>{`${takesData?.noShowCnt}명 미인수`}</StateItem>
                </StateContents>
            </StateData>
        </Container>
    );
}

const Container = styled.div`
    padding: 10px 0px;
    margin: 0 auto;
    align-items: center;
`;

const DateContainer = styled.div`
    display: flex;
    margin: 10px auto;
    padding: 10px;
    align-items: center;
    color: #FFF;
    background-color: #232D63;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const DateData = styled.div`
    width: 40%;
    margin: 0 auto;
    padding: 10px 0px;
    align-items: center;
`;

const DateItem = styled.div`
    margin: 0 auto;
    align-items: center;
`;

const StateData = styled.div`
    margin: 30px auto;
    align-items: center;
    font-size: 18px;
`;

const StateContents = styled.div`
    margin: 20px 0px 0px 0px;
    display: flex;
    justify-content: space-around;
`;

const StateItem = styled.div`
`;