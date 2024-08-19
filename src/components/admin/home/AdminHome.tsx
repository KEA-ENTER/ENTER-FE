import styled from 'styled-components';
import AdminHomeContents from './AdminHomeContents';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
    const navigate = useNavigate()

    const goPage = (url: string) =>{
        navigate(url);
    }

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('role');
        navigate('/');
        window.location.reload();
    }

    return (
        <Container>
            <TitleText>{"탈까?"}</TitleText>
            <Description>{"관리자 홈"}</Description>
            <AdminHomeContents />
            <Navigation>
                <NavBtn onClick={() => goPage('/admin/vehicle-step')}>
                    <NavIcon src='/img/vehicle-step.png' alt="Title Image" />
                    {`인수 관리`}
                </NavBtn>
                <NavBtn onClick={() => goPage('/admin/lottery')}>
                    <NavIcon src='/img/lottery.png' alt="Title Image" />
                    {`추첨 관리`}
                </NavBtn>
                <NavBtn onClick={() => goPage('/admin/vehicle')}>
                    <NavIcon src='/img/car.png' alt="Title Image" />
                    {`차량 관리`}
                </NavBtn>
                <NavBtn onClick={() => goPage('/admin/question')}>
                    <NavIcon src='/img/headphone.png' alt="Title Image" />
                    {`문의 관리`}
                </NavBtn>
            </Navigation>
            <Logout onClick={logout}>로그아웃</Logout>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    align-items: center;
    // background-color: #eeeeee40;
    padding: 30px;
`;

const Description = styled.div`
    color: #aaa;
`;

const TitleText = styled.h1`
  color: #000000;
  font-size: 35px;
  font-weight: bold;
`;

const Navigation = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const NavIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const NavBtn = styled.div`
    height: 100px;
    width: calc(50% - 10px);
    font-size: 25px;
    font-weight: bold;
    border-radius: 10px;
    background: #FEE500;
    cursor: pointer;
    padding: 20px 30px;
    justify-content: center;
    text-align: center; 
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Logout = styled.div`
    color: #aaa;
    text-decoration: underline;
    margin: 10px 0px;
    cursor: pointer;
`;