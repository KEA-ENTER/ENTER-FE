import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../basic/Modal';
import ConfirmModal from '../../../basic/ConfirmModal';
import PenaltyListModel from '../../model/PenaltyListModel';
import DateString from '../../../basic/DateString';

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

const PenaltyList: React.FC<IdProps> = ({memberId}) => {
    const [alertModal, setAlertModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedPenalty, setSelectedPenalty] = useState<string | null>(null);
    const [penaltyList, setPenaltyList] = useState<PenaltyItem[]>([]);

    useEffect(() => {
        const fetchPenaltyData = async () => {
            const res = await PenaltyListModel(memberId);
            if (res) {
                setPenaltyList(res);
            }
        };
        fetchPenaltyData();
    }, [memberId]);

    const openAlertModal = (id: number, category: string, level: string) => {
        console.log(id)
        setSelectedPenalty(`선택된 페널티: ${category} / ${level}`);
        setAlertModal(true);
    };

    const closeAlertModal = () => {
        setAlertModal(false);
        setSelectedPenalty(null);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
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
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>{DateString(item.createdAt)}</TableCell>
                <TableCellDetail>{item.etc}</TableCellDetail>
                <TableCell>
                    <DeleteButton onClick={() => openAlertModal(idx, item.reason, item.level)}>삭제</DeleteButton>
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

// Style
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