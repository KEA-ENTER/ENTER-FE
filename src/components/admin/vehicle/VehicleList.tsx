import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../basic/Pagination';
import ConfirmModal from '../basic/ConfirmModal';
import Modal from '../basic/Modal';
import Loading from '../basic/Loading';
import CarMenu from './CarMenu';
import VehicleListModel from '../../../API/admin/vehicle/VehicleListModel';
import VehicleDeleteModel from '../../../API/admin/vehicle/VehicleDeleteModel';

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

// 차량 관리 리스트
const VehicleList: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();
    const [alertModal, setAlertModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";

    // 차량 목록 API를 호출한다.
    useEffect(() => {
        // 보여지는 페이지와 서버의 페이지 번호를 맞춘다.
        const pageNum = parseInt(page) - 1;

        VehicleListModel(word, type, pageNum).then(res => {
            if (res) {
                setVehicleData(res.vehicleList); 
                setTotalPage(res.totalPages);
            }
        });
    }, [type, word, page]);

    // 차량 삭제 API를 호출한다.
    const deleteVehicle = async (id: string) => {
        setLoading(true);
        const res = await VehicleDeleteModel(id);
        setLoading(false);
        return res;
    };

    // 차량 삭제 이전에 선택된 차량을 확인하는 모듈을 보여준다.
    const openAlertModal = (id: number, model: string, number: string) => {
        closeMenu();
        setSelectedId(id);
        setSelectedVehicle(`선택된 차량: ${model} / ${number}`);
        setAlertModal(true);
    };

    // 차량 삭제 요청을 처리한다.
    const handleDelete = async (confirmed: boolean) => {
        console.log(confirm)
        if (confirmed) { // 차량 삭제 확인 모듈에서 확인을 받았을 때 차량 삭제 API를 호출한다.
            const res = await deleteVehicle(String(selectedId));
            if (res) { // 성공적으로 삭제되었을 때
                setAlertModal(false);
                setConfirmModal(true);
            } else { // API 호출 오류로 삭제에 실패했을 때
                setAlertModal(false);
                setErrorModal(true);
            }
            setSelectedId(null);
            setSelectedVehicle(null);
            query.delete("q");
            query.delete("type");
            query.delete("page");
            navigate({
                search: query.toString(),
            });
        } else {
            setAlertModal(false);
            setSelectedId(null);
        }
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
        window.location.reload();
    };

    const closeErrorModal = () => {
        setErrorModal(false);
        window.location.reload();
    }

    // 차량 더보기 메뉴
    const openMenu = (id: number) => {
        setSelectedId(id);
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setSelectedId(null);
    };

    // 리스트 아이템 클릭 시 차량 상세보기 페이지로 이동한다.
    const goDetailPage = (id: number) => {
        navigate(`detail/${id}`);
    };

    // 서버에 저장된 차량 상태를 한글로 변환해서 보여준다.
    const getStatusText = (state: string) => {
        if (state === 'AVAILABLE')
            return '사용 가능';
        else if (state === 'ON_RENT')
            return '인수중';
        else if (state === 'UNAVAILABLE')
            return '사용 불가능';
        else
            return '';
    };

    return (
        <Container>
            {vehicleData.length === 0 ? (
                <NoResultMessage>결과가 존재하지 않습니다</NoResultMessage>
            ) : (
                <>
                    <Table>
                        <thead>
                            <TableTitle>  
                                <TableHeader></TableHeader>
                                <TableHeader>모델</TableHeader>
                                <TableHeader>차량 번호</TableHeader>
                                <TableHeader>수용 가능 인원</TableHeader>
                                <TableHeader>상태</TableHeader>
                                <TableHeader></TableHeader>
                            </TableTitle>
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
                    {alertModal && selectedVehicle !== null && (
                        <ConfirmModal
                            title="정말 삭제하시겠습니까?"
                            description={selectedVehicle}
                            onClose={handleDelete}
                            setIsConfirmed={setConfirm}
                        />
                    )}
                    {confirmModal && (
                        <Modal 
                            title="삭제되었습니다."
                            description=""
                            onClose={closeConfirmModal}
                        />
                    )}
                    {errorModal && (
                        <Modal
                            title='차량 삭제에 실패했습니다.'
                            description='예기치 못한 서버 문제가 발생했습니다.'
                            onClose={closeErrorModal} 
                        />
                    )}
                    {loading && (
                        <Loading />
                    )}
                    <Pagination totalPages={totalPage} pagesPerGroup={10}/>
                </>
            )}
        </Container>
    );
};

export default VehicleList;

const Container = styled.div`
    padding: 0px;
    border-radius: 0px;
`;

const NoResultMessage = styled.div`
    padding: 20px;
    text-align: center;
    font-size: 18px;
    color: #686868;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
`;

const TableTitle = styled.tr`
    border-bottom: solid 1px #686868;
`;

const TableRow = styled.tr`
    border-bottom: solid 1px #686868;
    &:hover {
        background: rgba(220, 220, 220, 0.6);
    }
`;

const TableHeader = styled.td`
    font-style: none;
    padding: 10px;
    text-align: center;
    width: 10%;
`;

const TableCell = styled.td`
    padding: 7px;
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
