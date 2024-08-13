import styled from 'styled-components';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';

import sad from '../../../img/icon/sad.png';

export default function NotApplicationDatePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Img alt="sadIcon" src={sad} />
            <Message>신청일자가 아니에요..</Message>
            <div>자세한 신청 일정를 확인하고 싶으면?</div>
            <Button
                onClick={() => {
                    navigate('/');
                }}
            >
                신청일자 확인하기
            </Button>
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
