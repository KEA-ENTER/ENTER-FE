import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AdminLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <HeaderLayout />
            <Content>
                <Outlet />
            </Content>
        </LayoutContainer>
    );
};

export default AdminLayout;

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
    height: 100vh;
    overflow-x: auto;
`;

const HeaderLayout = styled(Header)`
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
`;

const Content = styled.div`
    margin: 50px 0px 0px 0px;
    width: 850px;
    @media (max-width: 850px) {
        width: 100%;
    }
`;
