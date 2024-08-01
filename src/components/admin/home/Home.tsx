import styled from 'styled-components';

export default function Home() {

    return (
        <Container>
            <TitleContainer>
                <TitleText>{"탈까말까 탈까?"}</TitleText>
            </TitleContainer>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eeeeee;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 20px 0px 10px 0px;
`;

const TitleText = styled.h1`
  color: #232D63;
  font-size: 35px;
  font-weight: bold;
`;