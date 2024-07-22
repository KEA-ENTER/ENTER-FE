import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../basic/Modal';
import data from '../../../data/admin/step/penalty.json';

const PenaltyManage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <Container>
      <Title>페널티 내역</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>사유</TableHeader>
            <TableHeader>날짜</TableHeader>
            <TableHeaderDetail>비고</TableHeaderDetail>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCellDetail>{item.detail}</TableCellDetail>
              <TableCell>
                <DeleteButton onClick={() => openModal(item.id)}>삭제</DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {isModalOpen && selectedId !== null && (
        <Modal
          title="정말 삭제하시겠습니까?"
          description={`삭제할 페널티의 아이디: ${selectedId}`}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default PenaltyManage;

// Style
const Container = styled.div`
  background: rgba(238, 238, 238, 0.6);
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
  width: 20%;
`;

const TableHeaderDetail = styled(TableHeader)`
  width: 40%;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  width: 20%;
`;

const TableCellDetail = styled(TableCell)`
  width: 40%;
`;

const DeleteButton = styled.button`
  background-color: #FEE500;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
`;