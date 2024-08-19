import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../UI/NavBar';

const Layout: React.FC = () => {
    return (
        <Main>
            <Outlet />
            <NavBar />
        </Main>
    );
};

const Main = styled.main`
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 24px;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export default Layout;
