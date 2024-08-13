import styled from 'styled-components';

const Loading: React.FC = () => {

    return (
        <Overlay>
            <ModalContainer>
                <Title>{"잠시만 기다려주세요"}</Title>
            </ModalContainer>
        </Overlay>
    );
};

export default Loading;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 450px;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
`;
