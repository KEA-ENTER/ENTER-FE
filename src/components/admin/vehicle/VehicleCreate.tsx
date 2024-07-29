import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../basic/Title';
import Button from '../basic/Button';
import Modal from '../basic/Modal';
import VehicleForm from './VehicleForm';

export default function VehicleCreate() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        model: '',
        manufacturer: '',
        vehicleNumber: '',
        fuel: '',
        capacity: '',
        status: 'available',
        image: null as File | null
    });
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    const navigate = useNavigate();

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
            setIsErrorModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsErrorModalOpen(false);
    };

    const goVehicleCreate = () => {
        navigate('/vehicle');
    };

    return (
        <div>
            <Title imageSrc="/img/car.png" title="차량 추가" />
            <VehicleForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleImageUpload={handleImageUpload}
                imagePreview={imagePreview}
            />
            <Button text="취소" onClick={goVehicleCreate} />
            <Button text="확인" onClick={handleCreate} />
            {isModalOpen && (
                <Modal
                    title="등록되었습니다."
                    description=""
                    onClose={closeModal}
                />
            )}
            {isErrorModalOpen && (
                <Modal
                    title="내용을 전부 입력해주세요"
                    description=""
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
