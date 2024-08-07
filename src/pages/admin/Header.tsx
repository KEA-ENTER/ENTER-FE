import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const goPage = (dir: string) => {
        navigate(dir)
    }

    return (
        <Head>
            <Container>
                <Title onClick={() => goPage('/admin')}>탈까?</Title>
                <Menu onClick={() => goPage('/admin/vehicle-step')}>인수 관리</Menu>
                <Menu onClick={() => goPage('/admin/lottery')}>추첨 관리</Menu>
                <Menu onClick={() => goPage('/admin/vehicle')}>차량 관리</Menu>
                <Menu onClick={() => goPage('/admin/question')}>문의 관리</Menu>
            </Container>
        </Head>
    );
};

export default Header;

const Head = styled.div`
  width: 100%;
  height: 50px;
  background-color: #FEE500;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  left: calc((100% - 850px) / 2.5);
  transform: translateX(-50%);
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  width: 850px;
  margin: 0 auto;
`;

const Menu = styled.div`
  font-size: 16px;
  margin: 0 20px 0 0;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;
