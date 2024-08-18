import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Input from '../../../components/user/UI/Input';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';
import Button from '../../../components/user/UI/Button';
import Modal from '../../../components/user/UI/Modal'; // 모달 컴포넌트 불러오기
import { useNavigate } from 'react-router-dom';
import addLicense from '../../../API/user/addLicense';
import autoRouting from '../../../API/user/autoRouting';
import navigateBasedOnRoutingId from '../../../utils/navigateOnRoutingId';

export default function AddLicensePage() {
    const [licenseCode, setLicenseCode] = useState<string>('');
    const [licensePassword, setLicensePassword] = useState<string>('');
    const [personalInfoAgree, setPersonalInfoAgree] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 여부 상태
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
        setShowModal(true); // 모달을 표시
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달을 닫음
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
                const autoRoutingPage = sessionStorage.getItem('autoRoutingPage');

                if (autoRoutingPage === null) {
                    const autoRoutingResponse = await autoRouting();
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
            <Modal show={showModal} handleClose={handleCloseModal}>
                <p>
                    제1조(목적) 탈까(이하 ‘회사’라고 함)는 회사가 제공하고자 하는 서비스(이하 ‘회사 서비스’)를 이용하는
                    개인(이하 ‘이용자’ 또는 ‘개인’)의 정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망
                    이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’) 등 관련 법령을 준수하고, 서비스 이용자의
                    개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                    개인정보처리방침(이하 ‘본 방침’)을 수립합니다.
                </p>
                <p>
                    제8조(사전동의 등에 따른 개인정보의 제공) 1. 회사는 개인정보 제3자 제공 금지에도 불구하고, 이용자가
                    사전에 공개하거나 다음 각호 사항에 대하여 동의한 경우에는 제3자에게 개인정보를 제공할 수 있습니다.
                    다만 이 경우에도 회사는 관련 법령 내에서 최소한으로 개인정보를 제공합니다. 가. Codef에게 면허
                    진위여부 확인을 위하여 면허 일련정보, 면허 암호 일련번호, 사용자 이름, 생년월일을 제공
                </p>
                <p>
                    제9조(개인정보의 보유 및 이용기간) 1. 회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적
                    달성을 위한 기간 동안 개인정보를 보유 및 이용합니다. 2. 전항에도 불구하고 회사는 내부 방침에 의해
                    서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.
                </p>
            </Modal>
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
    cursor: pointer;
`;

const CheckBox = styled.input`
    margin-right: 5px;
`;

const Error = styled.div`
    font-weight: 300;
    font-size: 15px;
    color: red;
`;
