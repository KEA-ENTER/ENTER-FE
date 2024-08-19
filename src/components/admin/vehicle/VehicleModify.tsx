import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../basic/Title';
import Button from '../basic/Button';
import Modal from '../basic/Modal';
import Loading from '../basic/Loading';
import VehicleForm from './VehicleForm';
import VehicleModifyModel from '../../../API/admin/vehicle/VehicleModifyModel';

interface FormDataType {
    model: string;
    manufacturer: string;
    vehicleNumber: string;
    fuel: 'DIESEL' | 'GASOLINE' | 'ELECTRICITY';
    capacity: string;
    status: 'AVAILABLE' | 'INACTIVE';
    image: File | null;
}

// 차량 수정 페이지
export default function VehicleModify() {
    const [confirmModal, setConfirmModal] = useState(false);
    const [errorState, setErrorState] = useState("올바르지 않은 내용을 입력했습니다.");
    const [errorModal, setErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string }>();
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

     // VehicleForm에서 가져온 데이터를 통해 차량 수정 API를 호출한다.
    const modifyVehicle = async () => {
        const res = await VehicleModifyModel(
            id,
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

    // 입력값을 현재 컴포넌트에 저장한다
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // 이미지 입력값 미리보기를 보여준다.
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

    // 사용자의 차량 수정 요청을 처리한다.
    const handleCreate = async () => {
        setLoading(true);
        const { model, manufacturer, vehicleNumber, fuel, capacity, image } = formData;
        if (!model || !manufacturer || !vehicleNumber || !fuel || !capacity || !image) { // 입력 값이 전부 존재하지 않을 때 
            setLoading(false)
            setErrorState("내용을 전부 입력해주세요.");
            setErrorModal(true);
        } else { // 입력값이 전부 존재한다면 차량 추가 API를 호출한다.
            const res = await modifyVehicle();
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
            <Title imageSrc="/img/car.png" title="차량 수정하기" />
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
                    title="수정되었습니다."
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