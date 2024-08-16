import styled from 'styled-components';
import loop from '../../../img/icon/loop.png';

const Loading = () => {
    return (
        <CompliteContainer>
            <Img src={loop} />
            <SubTitle>로딩 중이에요</SubTitle>
            <Disc>잠시만 기다려 주세요..</Disc>
        </CompliteContainer>
    );
};

export default Loading;

const CompliteContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    width: 100px;
`;

const SubTitle = styled.h2`
    margin-top: 10px;
`;

const Disc = styled.p`
    color: gray;
    margin-bottom: 10px;
`;
