import styled from 'styled-components';

interface PageProps {
    subTitle: string;
}

const SubTitle: React.FC<PageProps> = ({ subTitle }) => {
    return <StyledSubTitle>{subTitle}</StyledSubTitle>;
};

const StyledSubTitle = styled.h2`
    width: 100%;
    font-size: 20px;
    margin: 12px 0px 5px 5px;
`;

export default SubTitle;
