import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../../components/admin/basic/Header';

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
`;

const HeaderLayout = styled(Header)`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
`;

const Content = styled.div`
  margin-top: 50px;
  width: 850px;
`;
