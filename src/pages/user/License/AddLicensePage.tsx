import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Input from '../../../components/user/UI/Input';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';

export default function AddLicensePage() {
    const [licenseCode, setLicenseCode] = useState<number | ''>('');
    const [licensePassword, setLicensePassword] = useState<number | ''>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleLicenseCode = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setLicenseCode(value === '' ? '' : parseInt(value, 10));
        }
    };

    const handleLicensePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setLicensePassword(value === '' ? '' : parseInt(value, 10));
        }
    };

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('/api/license', {
                licenseCode,
                licensePassword,
            });

            if (response.data.success) {
                navigate('/next-page');
            } else {
                setErrorMessage('입력한 정보를 다시 확인해주세요.');
            }
        } catch (error) {
            setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    const isButtonDisabled = licenseCode === '' || licensePassword === '';

    return (
        <Container>
            <Title title="면허증 등록" />
            <SubTitle subTitle="면허증 등록이 필요해요." />
            <Section>
                <Input
                    value={licenseCode === '' ? '' : licenseCode}
                    onChange={handleLicenseCode}
                    type="number"
                    placeholder="면허증 일련번호"
                />
                <Input
                    value={licensePassword === '' ? '' : licensePassword}
                    onChange={handleLicensePassword}
                    type="number"
                    placeholder="암호 일련번호"
                />
                <ButtonContainer>
                    <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
                        다음
                    </Button>
                    {errorMessage && <Error>{errorMessage}</Error>}
                </ButtonContainer>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    // border: 1px solid red;
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-end;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const Error = styled.div`
    color: red;
    margin-top: 10px;
`;
