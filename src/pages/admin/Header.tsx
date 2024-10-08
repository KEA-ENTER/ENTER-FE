import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPath, setSelectedPath] = useState(location.pathname);

    useEffect(() => {
        const menu = location.pathname.split(/[/?]/);
        setSelectedPath(menu[2]);
    }, [location.pathname]);

    const goPage = (dir: string) => {
        navigate(dir);
        setSelectedPath(dir);
    }

    const isMenuSelected = (base: string) => {
        return selectedPath === base;
    }

    return (
        <Head>
            <Container>
                <Title onClick={() => goPage('/admin')}>탈까?</Title>
                <Menu onClick={() => goPage('/admin/vehicle-step')} $isselected={isMenuSelected('vehicle-step')}>인수 관리</Menu>
                <Menu onClick={() => goPage('/admin/lottery')} $isselected={isMenuSelected('lottery')}>추첨 관리</Menu>
                <Menu onClick={() => goPage('/admin/vehicle')} $isselected={isMenuSelected('vehicle')}>차량 관리</Menu>
                <Menu onClick={() => goPage('/admin/question')} $isselected={isMenuSelected('question')}>문의 관리</Menu>
            </Container>
        </Head>
    );
};

export default Header;

const Head = styled.div`
  width: 100%;
  height: 50px;
  background-color: #FEE500;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
`;

const Container = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 0 20px 0 10px;
  cursor: pointer;
`;

const Menu = styled.div<{ $isselected: boolean }>`
  font-size: 16px;
  margin: 0 20px 0 0;
  cursor: pointer;
  font-weight: ${props => props.$isselected ? 'bold' : 'normal'};
  &:hover {
    color: #303570;
  }
`;
