import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Input from '../../../components/user/UI/Input';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';
import addLicense from '../../../API/addLicense';

export default function AddLicensePage() {
    const [licenseCode, setLicenseCode] = useState<string>('');
    const [licensePassword, setLicensePassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleLicenseCode = (event: ChangeEvent<HTMLInputElement>) => {
        setLicenseCode(event.target.value);
    };

    const handleLicensePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setLicensePassword(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const response = await addLicense(licenseCode, licensePassword);

            if (response.success) {
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
                <Input value={licenseCode} onChange={handleLicenseCode} type="text" placeholder="면허증 일련번호" />
                <Input
                    value={licensePassword}
                    onChange={handleLicensePassword}
                    type="text"
                    placeholder="암호 일련번호"
                />
                {errorMessage && <Error>{errorMessage}</Error>}
                <ButtonContainer>
                    <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
                        다음
                    </Button>
                </ButtonContainer>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const Error = styled.div`
    font-weight: 300;
    font-size: 15px;
    color: red;
`;
