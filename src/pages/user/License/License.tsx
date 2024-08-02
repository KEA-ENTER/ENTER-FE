import { useState } from 'react';
import Input from '../../../components/user/UI/Input';
import NavBar from '../../../components/user/UI/NavBar';
// import Layout from '../../../components/user/Layout/Layout';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';

export default function License() {
    const [licenseCode, setLicenseCode] = useState<number | ''>('');
    const [licensePassword, setLicensePassword] = useState<number | ''>('');

    const handleLicenseCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLicenseCode(value === '' ? '' : parseInt(value, 10));
        console.log(value === '' ? '' : parseInt(value, 10));
    };

    const handleLicensePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLicensePassword(value === '' ? '' : parseInt(value, 10));
        console.log(value === '' ? '' : parseInt(value, 10));
    };

    return (
        <div>
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
            </Section>
            <NavBar />
        </div>
    );
}
