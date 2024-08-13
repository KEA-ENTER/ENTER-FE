import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/userStore';

import 차량신청 from '../../../img/icon/car.png';
import 통계 from '../../../img/icon/chart.png';
import 차량인수 from '../../../img/icon/key.png';
import 문의 from '../../../img/icon/message.png';
import 내정보 from '../../../img/icon/user.png';

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const state = useUserStore((state) => state.state);

    const [activePage, setActivePage] = useState<string | null>(null);
    const [showRRButton, setShowRRButton] = useState<boolean>(false);

    useEffect(() => {
        if (state === 'WINNER') {
            setShowRRButton(true);
        }

        const pageMapping: { [key: string]: string } = {
            '/application': 'vehicle',
            '/detail': 'vehicle',
            '/lottery-result': 'vehicle',
            '/statistics': 'statistics',
            '/rent': 'rr',
            '/return': 'rr',
            '/question': 'question',
            '/write': 'question',
            '/questiondetail': 'question',
            '/mypage': 'mypage',
        };

        setActivePage(pageMapping[location.pathname] || null);
    }, [state, location.pathname]);

    const isLicensePage = location.pathname === '/license';

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const autoRouting = () => {
        const autoRouting = sessionStorage.getItem('autoRoutingPage');
        if (autoRouting === '1') {
            navigate('/application'); //차량 신청 페이지
        } else if (autoRouting === '2') {
            navigate('/detail'); //
        } else if (autoRouting === '3') {
            navigate('/detail');
        } else if (autoRouting === '4') {
            navigate('/lottery-result');
        }
    }

    return (
        <Nav $isHidden={isLicensePage}>
            <Button onClick={() => autoRouting()}>
                <Img alt="차량신청 아이콘" src={차량신청} />
                <Title $isHighlighted={activePage === 'vehicle'}>차량신청</Title>
            </Button>
            <Button onClick={() => handleNavigation('/statistics')}>
                <Img alt="통계 아이콘" src={통계} />
                <Title $isHighlighted={activePage === 'statistics'}>통계</Title>
            </Button>
            <RRButton $isHidden={!showRRButton}>
                <Button onClick={() => handleNavigation('/rent')}>
                    <KeyImg>
                        <Img alt="차량인수 아이콘" src={차량인수} />
                    </KeyImg>
                    <Title $isHighlighted={activePage === 'rr'}>차량인수</Title>
                </Button>
            </RRButton>
            <Button onClick={() => handleNavigation('/question')}>
                <Img alt="문의 아이콘" src={문의} />
                <Title $isHighlighted={activePage === 'question'}>문의</Title>
            </Button>
            <Button onClick={() => handleNavigation('/mypage')}>
                <Img alt="내 정보 아이콘" src={내정보} />
                <Title $isHighlighted={activePage === 'mypage'}>내 정보</Title>
            </Button>
        </Nav>
    );
}

const Nav = styled.nav<{ $isHidden: boolean }>`
    width: 100%;
    height: 90px;
    display: ${({ $isHidden }) => ($isHidden ? 'none' : 'flex')};
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 80px;

    @media (max-width: 500px) {
        margin-bottom: 0px;
    }
`;

const RRButton = styled.div<{ $isHidden: boolean }>`
    display: ${({ $isHidden }) => ($isHidden ? 'none' : 'flex')};
`;

const Title = styled.div<{ $isHighlighted?: boolean }>`
    margin-top: 5px;
    color: black;
    font-size: 15px;
    font-weight: 400;
    padding: 2px 10px 0px 10px;
    border-radius: 50px;
    background-color: ${({ $isHighlighted }) => ($isHighlighted ? '#fee500' : 'transparent')};
`;

const Button = styled.button`
    border: none;
    background: none;
    display: flex;
    flex-direction: column;
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
