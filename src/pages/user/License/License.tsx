import { useState, ChangeEvent } from 'react';
import Input from '../../../components/user/UI/Input';
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Section from '../../../components/user/UI/Section';
import Button from '../../../components/user/UI/Button';

export default function License() {
    const [licenseCode, setLicenseCode] = useState<number | ''>('');
    const [licensePassword, setLicensePassword] = useState<number | ''>('');

    const handleLicenseCode = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLicenseCode(value === '' ? '' : parseInt(value, 10));
    };

    const handleLicensePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLicensePassword(value === '' ? '' : parseInt(value, 10));
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
                    type="text"
                    placeholder="암호 일련번호"
                />
                <Button disabled={true}>차량신청</Button>
            </Section>
        </div>
    );
}
