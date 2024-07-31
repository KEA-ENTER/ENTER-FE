import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import data from '../../../data/admin/step/vehicle.json';
import CarMenu from './CarMenu';
import Modal from '../basic/Modal';

const VehicleList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    const openModal = (id: number) => {
        setSelectedId(id);
        setIsModalOpen(true);
        setIsMenuOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedId(null);
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

    return (
        <Container onClick={closeModal}>
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
                    {data.map((item) => (
                        <TableRow key={item.id} onClick={() => goDetailPage(item.id)}>
                            <TableCell>
                                <CarImg src={item.image} />
                            </TableCell>
                            <TableCell>{item.model}</TableCell>
                            <TableCell>{item.number}</TableCell>
                            <TableCell>{item.personnel}명</TableCell>
                            <TableCell>{item.state}</TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                <MoreBtn src='/img/more.png' onClick={() => openMenu(item.id)}/>
                                {isMenuOpen && selectedId === item.id && (
                                    <CarMenu
                                        key={selectedId}
                                        onCloseMenu={closeMenu}
                                        onOpenModal={() => openModal(item.id)}
                                        id={selectedId} 
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            {isModalOpen && (
                <Modal
                    title="정말 삭제하시겠습니까?"
                    description={`삭제할 페널티의 아이디: ${selectedId}`}
                    onClose={closeModal}
                />
            )}
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
