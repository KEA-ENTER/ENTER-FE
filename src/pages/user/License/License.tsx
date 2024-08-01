import { useState } from 'react';
import Page from '../../../components/user/Layout/Page';
import Input from '../../../components/user/UI/Input';

export default function UserPage() {
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
        <Page title="면허증 등록" subTitle="면허증 등록이 필요해요.">
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
        </Page>
    );
}
