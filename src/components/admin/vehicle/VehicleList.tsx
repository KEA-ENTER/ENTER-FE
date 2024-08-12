import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VehicleListModel from './model/VehicleListModel';
import Pagination from '../basic/Pagination';
import CarMenu from './CarMenu';
import ConfirmModal from '../basic/ConfirmModal';
import Modal from '../basic/Modal';

interface VehicleItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    vehicleNo: string;
    company: string;
    model: string;
    seats: number;
    fuel: string;
    img: string;
    state: string;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

const VehicleList: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();
    const [alertModal, setAlertModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

    const [vehicleData, setVehicleData] = useState<VehicleItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    useEffect(() => {
        const pageNum = parseInt(page) - 1;

        VehicleListModel(word, type, pageNum).then(res => {
            if (res) {
                setVehicleData(res.vehicleList); 
                setTotalPage(res.totalPages);
            }
        });
    }, [type, word, page]);

    const openAlertModal = (id: number, model: string, number: string) => {
        closeMenu();
        console.log(id)
        setSelectedVehicle(`선택된 차량: ${model} / ${number}`);
        setAlertModal(true);
    };

    const closeAlertModal = () => {
        setAlertModal(false);
        setSelectedVehicle(null);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
    }

    const openMenu = (id: number) => {
        setSelectedId(id);
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setSelectedId(null);
    }

    const goDetailPage = (id: number) => {
        navigate(`detail/${id}`);
    }

    const getStatusText = (state: string) => {
        if (state === 'AVAILABLE')
            return '사용 가능';
        else if (state === 'ON_RENT')
            return '인수중';
        else if (state == 'UNAVAILABLE')
            return '사용 불가능';
        else
            return '';
    }

    return (
        <Container onClick={closeAlertModal}>
            <Table>
                <thead>
                    <TableRow>  
                        <TableHeader></TableHeader>
                        <TableHeader>모델</TableHeader>
                        <TableHeader>차량 번호</TableHeader>
                        <TableHeader>수용 가능 인원</TableHeader>
                        <TableHeader>상태</TableHeader>
                        <TableHeader></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {vehicleData.map((item) => (
                        <TableRow key={item.id} onClick={() => goDetailPage(item.id)}>
                            <TableCell>
                                <CarImg src={item.img} />
                            </TableCell>
                            <TableCell>{item.model}</TableCell>
                            <TableCell>{item.vehicleNo}</TableCell>
                            <TableCell>{item.seats}명</TableCell>
                            <TableCell>{getStatusText(item.state)}</TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                <MoreBtn src='/img/more.png' onClick={() => openMenu(item.id)}/>
                                {isMenuOpen && selectedId === item.id && (
                                    <CarMenu
                                        key={selectedId}
                                        onCloseMenu={closeMenu}
                                        onOpenModal={() => openAlertModal(item.id, item.model, item.vehicleNo)}
                                        id={selectedId} 
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            {alertModal && selectedVehicle !== null &&(
                <ConfirmModal
                    title="정말 삭제하시겠습니까?"
                    description={selectedVehicle}
                    onClose={closeAlertModal}
                    setIsConfirmed = {setConfirmModal}
                />
            )}
            {confirmModal && (
                <Modal 
                    title="삭제되었습니다."
                    description=""
                    onClose={closeConfirmModal}
                />
            )}
            <Pagination totalPages={totalPage} />
        </Container>
    );
};

export default VehicleList;

// Style
const Container = styled.div`
    padding: 0px;
    border-radius: 0px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
`;

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 10%;
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
    position: relative;
`;

const CarImg = styled.img`
    height: 90px;
    width: 90px;
    object-fit: contain;
`;

const MoreBtn = styled.img`
    height: 25px;
    width: 30px;
    object-fit: contain;
`;
