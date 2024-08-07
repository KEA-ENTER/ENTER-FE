import styled from 'styled-components';

export default function AdminHomeContents() {

    return (
        <Container>
            <DateContainer>
                <DateData>
                    <DateItem>
                    언제언제
                    </DateItem>
                    <DateItem>
                    재배정 기간입니다
                    </DateItem>
                </DateData>
                <DateData>
                <DateItem>
                    언제언제
                    </DateItem>
                    <DateItem>
                    언제언제
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