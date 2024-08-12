import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import 차량신청 from '../../../img/icon/car.png';
import 통계 from '../../../img/icon/chart.png';
import 차량인수 from '../../../img/icon/key.png';
import 문의 from '../../../img/icon/message.png';
import 내정보 from '../../../img/icon/user.png';

export default function NavBar() {
    const location = useLocation();

    const isLicensePage = location.pathname === '/license';

    return (
        <Nav isHidden={isLicensePage}>
            <Button>
                <Img alt="차량신청 아이콘" src={차량신청} />
                <Title>차량신청</Title>
            </Button>
            <Button>
                <Img alt="통계 아이콘" src={통계} />
                <Title>통계</Title>
            </Button>
            <Button>
                <KeyImg>
                    <Img alt="hello" src={차량인수} />
                </KeyImg>
                <Title>차량인수</Title>
            </Button>
            <Button>
                <Img alt="차량인수 아이콘" src={문의} />
                <Title>문의</Title>
            </Button>
            <Button>
                <Img alt="차량인수 아이콘" src={내정보} />
                <Title>내 정보</Title>
            </Button>
        </Nav>
    );
}

// Nav 컴포넌트의 display 속성을 isHidden prop에 따라 설정합니다.
const Nav = styled.nav<{ isHidden: boolean }>`
    width: 100%;
    height: 90px;
    display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 80px;

    @media (max-width: 500px) {
        margin-bottom: 0px;
    }
`;

const Button = styled.div`
    display: flex;
    flex-direction: column;
    // justify-contents: center;
    align-items: center;
`;

const KeyImg = styled.div`
    width: 60px;
    height: 60px;
    background-color: #fee500;
    border-radius: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    width: 30px;
    object-fit: cover;
    opacity: 0.8;
`;

const Title = styled.div`
    color: black;
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
`;
