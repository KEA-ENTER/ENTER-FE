import styled from 'styled-components';

interface TitleProps {
  imageSrc: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ imageSrc, title }) => {
  return (
    <Container>
      <Image src={imageSrc} alt="Title Image" />
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default Title;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 10px 0px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const TitleText = styled.h1`
  color: #232D63;
  font-size: 35px;
  font-weight: bold;
`;