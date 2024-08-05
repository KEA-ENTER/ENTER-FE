import { useState } from 'react';
import styled from 'styled-components';

interface LoginProps {
    onLoginSuccess: (role: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://your-server-url/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('jwt', token);
            const payload = JSON.parse(atob(token.split('.')[1]));
            onLoginSuccess(payload.role);
        } else {
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

const Container = styled.div`
    height: 100vh;
    max-width: 500px;
    // border: 1px solid red;
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
    decoration: none;
    font-weight: 300;
    color: gray;
`;
const MainTitle = styled.h1`
    // width: 90%;
    font-size: 60px;
`;

const Article = styled.article`
    // border: 1px solid red;
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
