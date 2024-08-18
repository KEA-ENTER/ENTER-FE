import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import navigateBasedOnRoutingId from '../../../utils/navigateOnRoutingId';
import autoRouting from '../../../API/user/autoRouting';

import 차량신청 from '../../../img/icon/car.png';
import 통계 from '../../../img/icon/chart.png';
import 차량인수 from '../../../img/icon/key.png';
import 문의 from '../../../img/icon/message.png';
import 내정보 from '../../../img/icon/user.png';
import getReportType from '../../../API/user/getReportType';

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [activePage, setActivePage] = useState<string | null>(null);
    const [reportType, setReportType] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportType = async () => {
            try {
                const reportTypeResponse = await getReportType();
                console.log('reportTypeResponse: ', reportTypeResponse);
                setReportType(reportTypeResponse.reportType); // "TAKE", "RETURN", "NONE" 중 하나가 할당됨
            } catch (error) {
                console.error(error);
            }
        };

        fetchReportType();

        const determineActivePage = (pathname: string): string | null => {
            const pageMapping: { [key: string]: string } = {
                '/application': 'vehicle',
                '/detail': 'vehicle',
                '/lottery-result': 'vehicle',
                '/not-apply': 'vehicle',
                '/statistics': 'statistics',
                '/question': 'question',
                '/write': 'question',
                '/questiondetail': 'question',
                '/mypage': 'mypage',
            };

            if (pathname.startsWith('/rent') || pathname.startsWith('/return')) {
                return 'rr';
            }
            return pathname.startsWith('/penalty') ? 'mypage' : pageMapping[pathname] || null;
        };

        setActivePage(determineActivePage(location.pathname));
    }, [location.pathname]);

    const handleNavigation = (path: string) => navigate(path);

    const handleAutoRouting = async () => {
        let autoRoutingPage = sessionStorage.getItem('autoRoutingPage');

        if (!autoRoutingPage) {
            try {
                const autoRoutingResponse = await autoRouting();
                autoRoutingPage = autoRoutingResponse.routingId.toString();
                sessionStorage.setItem('autoRoutingPage', autoRoutingPage);
            } catch (error) {
                console.error('Auto-routing failed:', error);
                return;
            }
        }

        navigateBasedOnRoutingId(Number(autoRoutingPage), navigate);
    };

    return (
        <Nav $isHidden={location.pathname === '/license'}>
            <Button onClick={handleAutoRouting}>
                <Img alt="차량신청 아이콘" src={차량신청} />
                <Title $isHighlighted={activePage === 'vehicle'}>차량신청</Title>
            </Button>
            <Button onClick={() => handleNavigation('/statistics')}>
                <Img alt="통계 아이콘" src={통계} />
                <Title $isHighlighted={activePage === 'statistics'}>통계</Title>
            </Button>

            {reportType === 'TAKE' && (
                <Button onClick={() => handleNavigation('/rent/1')}>
                    <KeyImg>
                        <Img alt="차량인수 아이콘" src={차량인수} />
                    </KeyImg>
                    <Title $isHighlighted={activePage === 'rr'}>차량인수</Title>
                </Button>
            )}
            {reportType === 'RETURN' && (
                <Button onClick={() => handleNavigation('/return/1')}>
                    <KeyImg>
                        <Img alt="차량반납 아이콘" src={차량인수} />
                    </KeyImg>
                    <Title $isHighlighted={activePage === 'rr'}>차량반납</Title>
                </Button>
            )}

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
        margin-bottom: 5px;
    }
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
    cursor: pointer;
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
