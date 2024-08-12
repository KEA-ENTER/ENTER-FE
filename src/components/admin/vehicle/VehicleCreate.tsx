import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../basic/Title';
import Button from '../basic/Button';
import Modal from '../basic/Modal';
import VehicleForm from './VehicleForm';
import VehicleAddModel from './model/VehicleAddModel';

export default function VehicleCreate() {
    const [confirmModal, setConfirmModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        manufacturer: '',
        model: '',
        capacity: '',
        fuel: '',
        status: '',
        image: File
    });
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const navigate = useNavigate();

    const createVehicle = async () => {
        // vehicleNo, company, model, seats, fuel, img, state
        const res = await VehicleAddModel(formData.vehicleNumber, formData.manufacturer, formData.model, formData.capacity, formData.fuel, formData.image, formData.status);
        if (!res) {
            window.alert("실패");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData((prevData) => ({ ...prevData, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = () => {
        const { model, manufacturer, vehicleNumber, fuel, capacity, image } = formData;
        if (!model || !manufacturer || !vehicleNumber || !fuel || !capacity || !image) {
            setErrorModal(true);
        } else {
            createVehicle();
            setConfirmModal(true);
        }
    };

    const closeModal = () => {
        setConfirmModal(false);
        setErrorModal(false);
    };

    const goVehicleCreate = () => {
        navigate('/admin/vehicle');
    };

    return (
        <Container>
            <Title imageSrc="/img/car.png" title="차량 추가" />
            <VehicleForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleImageUpload={handleImageUpload}
                imagePreview={imagePreview}
            />
            <ButtonContainer>
                <ButtonWrapper>
                    <Button text="취소" onClick={goVehicleCreate} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button text="확인" onClick={handleCreate} />
                </ButtonWrapper>
            </ButtonContainer>
            {confirmModal && (
                <Modal
                    title="등록되었습니다."
                    description=""
                    onClose={closeModal}
                />
            )}
            {errorModal && (
                <Modal
                    title="내용을 전부 입력해주세요"
                    description=""
                    onClose={closeModal}
                />
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const ButtonContainer = styled.div`
    margin: 10px;
    display: flex;
    justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;