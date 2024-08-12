import { useState } from 'react';
import styled from 'styled-components';
import login from '../../API/auth';
import useUserStore from '../../stores/userStore';

interface LoginProps {
    onLoginSuccess: (role: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setUser = useUserStore((state) => state.setUser);

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            const { accessToken, refreshToken, memberName, memberRole } = data;
41
            // 세션 및 쿠키에 토큰 저장
            sessionStorage.setItem('accessToken', accessToken);
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly`;

            setUser(memberName, memberRole, accessToken);
            onLoginSuccess(memberRole);
        } catch (error) {
            alert('Login failed');
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
