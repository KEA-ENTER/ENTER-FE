import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function AdminHomeContents() {
    const [todayDate, setTodayDate] = useState('');
    const [todayState, setTodayState] = useState('');
    const [rentDate, setRentDate] = useState('0');
    const [returnDate, setReturnDate] = useState('0');


    useEffect(() => {
        getDate();
    }, [])
    

    const getDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const date = d.getDate();
        let day = '';

        switch (d.getDay()) {
            case 0:
                day = '일';
                setTodayState('재배정');
                setRentDate('-1');
                setReturnDate('+3');
                break;
            case 1:
                day = '월';
                setTodayState('재배정');
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
                응모 현황
            </StateData>
            <StateData>
                인수 현황
            </StateData>
        </Container>
    );
}

const Container = styled.div`
    padding: 20px 0px;
    margin: 0 auto;
    align-items: center;
`;

const DateContainer = styled.div`
    display: flex;
    margin: 20px auto;
    padding: 20px;
    align-items: center;
    color: #FFF;
    background-color: #232D63;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const DateData = styled.div`
    width: 40%;
    margin: 0 auto;
    align-items: center;
`;

const DateItem = styled.div`
    margin: 0 auto;
    align-items: center;
`;

const StateData = styled.div`
    margin: 30px auto;
    align-items: center;
`;