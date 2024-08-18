import { useState } from 'react';
import styled from 'styled-components';
import login from '../../API/user/login';

export default function Login({ stateHandler }: { stateHandler: (role: string) => void }) {
    //사용자 입력 state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const loginResponse = await login(username, password); // 로그인 API 호출

            //memberRole : USER / ADMIN
            const { accessToken, refreshToken, memberName, memberRole } = loginResponse; // 응답 값 저장

            //리프레시토큰 쿠키에 저장
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly`;

            sessionStorage.setItem('userName', memberName);
            // 세션 스토리지에 저장
            sessionStorage.setItem('accessToken', accessToken);
            //memberRole : USER / ADMIN
            sessionStorage.setItem('role', memberRole);
            //APP.tsx 에 role 전달.
            stateHandler(memberRole);
        } catch (error) {
            alert('아이디 또는 비밀번호를 확인해주세요');
        }
    };

    return (
        <Container>
            <TitleContainer>
                <SubTitle>회사 법인차량,</SubTitle>
                <MainTitle>탈까?</MainTitle>
            </TitleContainer>
            <Article>
                <Input
                    value={username}
                    type="text"
                    placeholder="이메일"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin}>로그인</Button>
            </Article>
            <Disc>· 이메일, 비밀번호를 입력해주세요</Disc>
        </Container>
    );
}

// 스타일 컴포넌트
const Container = styled.div`
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 24px;
    padding-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleContainer = styled.div`
    width: 100%;
`;

const SubTitle = styled.h2`
    width: 100%;
    font-weight: 300;
    color: gray;
`;

const MainTitle = styled.h1`
    font-size: 60px;
`;

const Article = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    font-size: 20px;
    font-weight: 200;
    border: 1px solid black;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #fee500;
    color: #191919;
`;

const Disc = styled.div`
    color: gray;
    font-weight: 200;
    width: 100%;
    padding-left: 10px;
`;
