import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../basic/Modal';
import ConfirmModal from '../../../basic/ConfirmModal';
import DateString from '../../../basic/DateString';
import PenaltyListModel from '../../../../../API/admin/step/PenaltyListModel';
import PenaltyDeleteModel from '../../../../../API/admin/step/PenaltyDeleteModel';

interface PenaltyItem{
    penaltyId: number,
    createdAt: string,
    reason: string,
    level: string,
    etc: string
}

interface IdProps {
    memberId: number;
}

// 페널티 리스트
const PenaltyList: React.FC<IdProps> = ({memberId}) => {
    const [alertModal, setAlertModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedPenalty, setSelectedPenalty] = useState<string | null>(null);
    const [penaltyList, setPenaltyList] = useState<PenaltyItem[]>([]);
    const [selectedPenaltyId, setSelectedPenaltyId] = useState<number | null>(null);

    // 페널티 내역 API를 호출한다.
    useEffect(() => {
        const fetchPenaltyData = async () => {
            const res = await PenaltyListModel(memberId);
            if (res) {
                setPenaltyList(res);
            }
        };
        fetchPenaltyData();
    }, [memberId]);

    // 페널티 삭제 API를 호출한다.
    const fetchPenaltyDeleteData = async (penaltyId: number | null) => {
        const res = await PenaltyDeleteModel(memberId, penaltyId);
        if (!res) {
            window.alert("실패");
        }
    };

    // 페널티 삭제 전 확인 후 
    const openAlertModal = (id: number, category: string, level: string, etc: string) => {
        setSelectedPenalty(`선택된 페널티: ${showPenaltyReason(category)} / ${showPenaltyLevel(level)} / ${etc}`);
        setSelectedPenaltyId(id);
        setAlertModal(true);
    };

    const closeAlertModal = (confirmed: boolean) => {
        if (selectedPenalty && confirmed) {
            fetchPenaltyDeleteData(selectedPenaltyId);
        }
        setAlertModal(false);
        setSelectedPenaltyId(null);
        setSelectedPenalty(null);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
        window.location.reload();
    }

    const showPenaltyLevel = (level: string) => {
        if (level === 'MINIMUM')
            return '매우 낮음';
        else if (level === 'LOW')
            return '낮음';
        else if (level == 'MEDIUM')
            return '보통';
        else if (level == 'HIGH')
            return '높음';
        else if (level == 'BLACKLIST')
            return '블랙리스트';
        else
            return level;
    }

    const showPenaltyReason = (reason: string) => {
        if (reason === "TAKE")
            return "인수"
        else if (reason === "RETURN")
            return "반납"
        else if (reason === "FUEL")
            return "연료"
        else if (reason === "BROKEN")
            return "파손"
        else if (reason === "ETC")
            return "기타"
        else
            return reason
    }

    return (
        <Container>
        <Title>페널티 내역</Title>
        <Table>
            <thead>
                <TableRow>
                    <TableHeader>사유</TableHeader>
                    <TableHeader>페널티 수준</TableHeader>
                    <TableHeader>날짜</TableHeader>
                    <TableHeaderDetail>비고</TableHeaderDetail>
                    <TableHeader></TableHeader>
                </TableRow>
            </thead>
            <tbody>
            {penaltyList.map((item, idx) => (
                <TableRow key={idx}>
                    <TableCell>{showPenaltyReason(item.reason)}</TableCell>
                    <TableCell>{showPenaltyLevel(item.level)}</TableCell>
                    <TableCell>{DateString(item.createdAt)}</TableCell>
                    <TableCellDetail>{item.etc}</TableCellDetail>
                    <TableCell>
                        <DeleteButton onClick={() => openAlertModal(item.penaltyId, item.reason, item.level, item.etc)}>삭제</DeleteButton>
                    </TableCell>
                </TableRow>
            ))}
            </tbody>
        </Table>
            {alertModal && selectedPenalty !== null &&(
                <ConfirmModal
                    title="정말 삭제하시겠습니까?"
                    description={selectedPenalty}
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
        </Container>
    );
}

export default PenaltyList;

const Container = styled.div`
  padding: 20px;
  border-radius: 0px;
`;

const Title = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.td`
  font-style: none;
  padding: 10px;
  text-align: center;
  width: 18%;
`;

const TableHeaderDetail = styled(TableHeader)`
  width: 28%;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  width: 18%;
`;

const TableCellDetail = styled(TableCell)`
  width: 28%;
`;

const DeleteButton = styled.button`
  background-color: #FEE500;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
`;