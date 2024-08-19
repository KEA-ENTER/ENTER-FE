import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../user/UI/Button';

import sad from '../../img/icon/sad.png';

import useAutoRouting from '../../utils/useAutoRouting';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    const role = sessionStorage.getItem('role');

    const toMain = () => {
        if (role == 'USER') {
            autoRoutingFunc();
        } else if (role == 'ADMIN') {
            console.log('ADMIN');
            navigate('/admin');
        }
    };

    return (
        <Container>
            <Img alt="sad" src={sad} />
            <Message>잘못된 접근이에요..</Message>
            <div>아래 버튼을 눌러 서비스로 돌아와주세요!</div>
            <div>
                <Button onClick={toMain}>돌아가기</Button>
            </div>
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
