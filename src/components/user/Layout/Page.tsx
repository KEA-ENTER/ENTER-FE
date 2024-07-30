import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PageProps {
    title: string;
    subTitle: string;
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ title, subTitle, children }) => {
    return (
        <Main>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <Article>{children}</Article>
        </Main>
    );
};

export default Page;

const Main = styled.main`
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 24px;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    width: 100%;
    font-size: 45px;
`;

const SubTitle = styled.h2`
    width: 100%;
    font-size: 20px;
`;

const Article = styled.article`
    color: gray;
    font-weight: 200;
    width: 100%;
`;
