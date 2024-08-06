import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PageProps {
    children: ReactNode;
}

const Section: React.FC<PageProps> = ({ children }) => {
    return <StyledSection>{children}</StyledSection>;
};

const StyledSection = styled.h1`
    // margin-top: 10px;
    color: gray;
    font-weight: 200;
    width: 100%;
`;

export default Section;
