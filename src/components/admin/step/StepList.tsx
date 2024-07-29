import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../basic/Modal';
import data from '../../../data/admin/step/step.json';

const StepList: React.FC = () => {
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
    
    const getStatusText = (state: string) => {
        if (state === 'return')
            return '반납 완료';
        else if (state === 'take-over')
            return '인수중';
        else if (state == 'waiting')
            return '인수 대기';
        else
            return '';
    }

    return (
        <Container>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeaderDetail>차량 정보</TableHeaderDetail>
                        <TableHeaderDetail>인수 기간</TableHeaderDetail>
                        <TableHeader>인수자명</TableHeader>
                        <TableHeader>상태</TableHeader>
                        <TableHeaderDetail></TableHeaderDetail>
                    </TableRow>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCellDetail>{item.model} - {item.number}</TableCellDetail>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.receiver}</TableCell>
                            <TableCellDetail>{getStatusText(item.state)}</TableCellDetail>
                            <TableCellDetail>
                                <ReportBtn 
                                    onClick={() => openModal(item.id)} 
                                    disabled={item.state === 'waiting'} 
                                    isDisabled={item.state === 'waiting'}
                                    >
                                    인수 보고서
                                </ReportBtn>
                                <ReportBtn 
                                    onClick={() => openModal(item.id)} 
                                    disabled={item.state !== 'return'} 
                                    isDisabled={item.state !== 'return'}
                                    >
                                    반납 보고서
                                </ReportBtn>
                            </TableCellDetail>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            {isModalOpen && selectedId !== null && (
            <Modal
                title="보고서로 연결해야 하는데"
                description={`기록 아이디: ${selectedId}`}
                onClose={closeModal}
                />
        )}
    </Container>
  );
};

export default StepList;

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

const TableHeaderDetail = styled(TableHeader)`
    width: 20%;
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    width: 10%;
    background: rgba(238, 238, 238, 0.6);
    border-bottom: solid 1px #ddd;
`;

const TableCellDetail = styled(TableCell)`
    width: 20%;
`;

const ReportBtn = styled.button<{ isDisabled: boolean }>`
    background-color: ${props => props.isDisabled ? '#ddd' : '#FEE500'};
    border: none;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    padding: 7px 12px;
    margin: 0px 5px;
    border-radius: 5px;
`;
