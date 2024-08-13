import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import Input from '../basic/Input';

interface VehicleFormProps {
    formData: {
        model: string;
        manufacturer: string;
        vehicleNumber: string;
        fuel: 'DIESEL' | 'GASOLINE' | 'ELECTRICITY';
        capacity: string;
        status: 'AVAILABLE' | 'INACTIVE';
        image: File | null;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview: string | ArrayBuffer | null;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ formData, handleInputChange, handleImageUpload, imagePreview }) => {
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        handleImageUpload({
            target: { files: [file] }
        } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.png', '.jpg'] } });

    return (
        <FormContainer>
            <Row>
                <InputTitle>모델</InputTitle>
                <Input
                    name="model"
                    placeholder="모델"
                    value={formData.model}
                    onChange={handleInputChange}
                    width="50%"
                />
                <InputTitle>제조 회사</InputTitle>
                <Input
                    name="manufacturer"
                    placeholder="제조 회사"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    width="50%"
                />
            </Row>
            <Row>
                <InputTitle>차량 번호</InputTitle>
                <Input
                    name="vehicleNumber"
                    placeholder="차량 번호"
                    value={formData.vehicleNumber}
                    onChange={handleInputChange}
                    width="50%"
                />
                <InputTitle>연료</InputTitle>
                <Input
                    name="fuel"
                    placeholder="연료"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    width="50%"
                />
            </Row>
            <Row>
                <InputTitle>수용 가능 인원</InputTitle>
                <Input
                    name="capacity"
                    placeholder="수용 가능 인원"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    width="50%"
                />
                <InputTitle>상태</InputTitle>
                <StatusContainer>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="AVAILABLE"
                            checked={formData.status === "AVAILABLE"}
                            onChange={handleInputChange}
                        />
                        사용 가능
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="INACTIVE"
                            checked={formData.status === "INACTIVE"}
                            onChange={handleInputChange}
                        />
                        사용 불가능
                    </label>
                </StatusContainer>
            </Row>
            <Row>
                <ImageUploadContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    {imagePreview ? (
                            <ImagePreview src={imagePreview as string} alt="미리보기" />
                    ) : (
                        <UploadMessage>
                            Drag & Drop <br /> 이미지 파일을 업로드해주세요
                        </UploadMessage>
                    )}
                </ImageUploadContainer>
            </Row>
        </FormContainer>
    );
};

export default VehicleForm;

const FormContainer = styled.div`
    background: rgba(238, 238, 238, 0.6);
    padding: 15px;
    margin: 20px 0;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
`;

const InputTitle = styled.div`
    width: 20%;
    margin: 0 10px;
`;

const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    // border: 1px solid red;
    width: 50%;
        padding: 8px;

    label {
        margin-right: 10px;
    }
`;

const ImageUploadContainer = styled.div`
    width: 98%;
    height: 350px;
    border: 2px dashed #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    padding: 15px;
    margin: 0 auto;
`;

const UploadMessage = styled.p`
    color: #999;
`;

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
`;