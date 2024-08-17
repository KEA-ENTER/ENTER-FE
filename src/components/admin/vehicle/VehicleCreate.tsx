import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../basic/Title';
import Button from '../basic/Button';
import Modal from '../basic/Modal';
import VehicleForm from './VehicleForm';
import VehicleAddModel from './model/VehicleAddModel';
import Loading from '../basic/Loading';

interface FormDataType {
    model: string;
    manufacturer: string;
    vehicleNumber: string;
    fuel: 'DIESEL' | 'GASOLINE' | 'ELECTRICITY';
    capacity: string;
    status: 'AVAILABLE' | 'INACTIVE';
    image: File | null;
}

export default function VehicleCreate() {
    const [confirmModal, setConfirmModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [errorState, setErrorState] = useState("올바르지 않은 내용을 입력했습니다.");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        model: "",
        manufacturer: "",
        vehicleNumber: "",
        fuel: 'DIESEL',
        capacity: "",
        status: 'AVAILABLE',
        image: null
    });
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const navigate = useNavigate();

    const createVehicle = async () => {
        const res = await VehicleAddModel(
            formData.vehicleNumber, 
            formData.manufacturer, 
            formData.model, 
            formData.capacity, 
            formData.fuel, 
            formData.image, 
            formData.status
        );
        return res;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const handleCreate = async () => {
        setLoading(true);
        const { model, manufacturer, vehicleNumber, fuel, capacity, image } = formData;
        if (!model || !manufacturer || !vehicleNumber || !fuel || !capacity || !image) {
            setLoading(false);
            setErrorState("내용을 전부 입력해주세요.");
            setErrorModal(true);
        } else {
            const res = await createVehicle();
            if (res) {
                setLoading(false)
                setConfirmModal(true);
            } else {
                setLoading(false)
                setErrorState("차량 번호 형식이 올바르지 않거나 중복되었습니다.");
                setErrorModal(true);
            }
        }
    };

    const closeModal = () => {
        setConfirmModal(false);
        navigate('/admin/vehicle')
    };

    const closeErrorModal = () => {
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
                    title="업로드에 실패하였습니다."
                    description={errorState}
                    onClose={closeErrorModal}
                />
            )}
            {loading && (
                <Loading />
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