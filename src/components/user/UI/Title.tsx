import styled from 'styled-components';

interface PageProps {
    title: string;
}

const Title: React.FC<PageProps> = ({ title }) => {
    return <StyledTitle>{title}</StyledTitle>;
};

const StyledTitle = styled.h1`
    width: 100%;
    font-size: 45px;
`;

export default Title;
