import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Input from '../../../components/user/UI/Input';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';
import Button from '../../../components/user/UI/Button';
import { useNavigate } from 'react-router-dom';
import addLicense from '../../../API/user/addLicense';
import autoRouting from '../../../API/user/autoRouting';
import navigateBasedOnRoutingId from '../../../utils/navigateOnRoutingId';

export default function AddLicensePage() {
    const [licenseCode, setLicenseCode] = useState<string>('');
    const [licensePassword, setLicensePassword] = useState<string>('');
    const [personalInfoAgree, setPersonalInfoAgree] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleLicenseCode = (event: ChangeEvent<HTMLInputElement>) => {
        setLicenseCode(event.target.value);
    };

    const handleLicensePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setLicensePassword(event.target.value);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPersonalInfoAgree(event.target.checked);
    };

    const handlePersonalInfoDiscClick = () => {
        alert('본 방침은 2022년 3월 25일부터 시행됩니다. 가천대학교가 취급하는 모든 개인정보는 「개인정보보호법」 등 관련 법령에 근거하거나 정보주체의 동의에 의하여 수집․보유․처리되고 있습니다. 가천대학교는 「개인정보보호법」에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있으며 개정하는 경우 홈페이지를 통하여 공지할 것입니다. 이 방침은 별도의 설명이 없는 한 통합인증(SSO)정보로 개인인증하는 모든 홈페이지에 적용됨을 알려드립니다.');
    };

    const handleButtonClick = async () => {
        if (!personalInfoAgree) {
            alert('개인정보 처리 방침에 동의해주세요.');
            return;
        }
        try {
            const response = await addLicense(licenseCode, licensePassword);

            console.log('response', response);

            if (response === 'SUCCESS') {
                const autoRoutingPage = sessionStorage.getItem('autoRoutingPage'); //세션에 저장된 라우팅 페이지 불러옴

                if (autoRoutingPage === null) {
                    const autoRoutingResponse = await autoRouting(); //세션에 저장된 라우팅 페이지가 없다면 API 호출
                    console.log('autoRoutingResponse: ', autoRoutingResponse);

                    sessionStorage.setItem('autoRoutingPage', autoRoutingResponse.routingId.toString());
                    navigateBasedOnRoutingId(autoRoutingResponse.routingId, navigate);
                }
            } else {
                setErrorMessage('입력한 정보를 다시 확인해주세요.');
            }
        } catch (error) {
            setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    const isButtonDisabled = licenseCode === '' || licensePassword === '' || !personalInfoAgree;

    return (
        <Container>
            <Title title="면허증 등록" />
            <SubTitle subTitle="면허증 등록이 필요해요." />
            <Section>
                <Input value={licenseCode} onChange={handleLicenseCode} type="number" placeholder="면허증 일련번호" />
                <Input
                    value={licensePassword}
                    onChange={handleLicensePassword}
                    type="text"
                    placeholder="암호 일련번호"
                />
                {errorMessage && <Error>{errorMessage}</Error>}
                <ButtonContainer>
                    <PersonalInfoBox>
                        <CheckBox type="checkbox" checked={personalInfoAgree} onChange={handleCheckboxChange} />
                        <PersonalInfoDisc onClick={handlePersonalInfoDiscClick}>
                            개인정보 처리 방침에 동의합니다.
                        </PersonalInfoDisc>
                    </PersonalInfoBox>
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
    justify-content: space-between;
`;

const PersonalInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
`;

const PersonalInfoDisc = styled.div`
    font-size: 15px;
    cursor: pointer; /* 클릭 가능한 요소로 변경 */
`;

const CheckBox = styled.input`
    margin-right: 5px;
`;

const Error = styled.div`
    font-weight: 300;
    font-size: 15px;
    color: red;
`;