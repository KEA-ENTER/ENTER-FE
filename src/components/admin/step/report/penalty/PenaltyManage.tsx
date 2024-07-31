import React, { useState } from 'react';
import styled from "styled-components";
import PenaltyMenu from './PenaltyMenu';
import Button from '../../../basic/Button';
import Modal from '../../../basic/Modal';

const PenaltyManage: React.FC = () => {
    const menuItems = ['메롱메롱', '너는 바보', '하기싫다', '살려줘'];
    const levelItems = ['개작은페널티', '괜찮', '개큰페널티'];
    const [penalties, setPenalties] = useState<{ reason: string, remark: string }[]>([{ reason: menuItems[0], remark: '' }]);
    const [alertModal, setAlertModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [openLevelIndex, setOpenLevelIndex] = useState<number | null>(null);

    const addPenalty = () => {
        setPenalties([...penalties, { reason: menuItems[0], remark: '' }]);
    };

    const updatePenalty = (index: number, updatedPenalty: { reason: string, remark: string }) => {
        const updatedPenalties = penalties.map((penalty, i) => i === index ? updatedPenalty : penalty);
        setPenalties(updatedPenalties);
    };

    const clearPenalties = () => {
        setPenalties([{ reason: menuItems[0], remark: '' }]);
    };

    const uploadPenalties = () => {
        const hasEmptyRemark = penalties.some(penalty => penalty.remark === '');
        if (hasEmptyRemark) {
            setAlertModal(true);
        } else {
            setConfirmModal(true);
        }
    };

    const closeAlertModal = () => {
        setAlertModal(false);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
    };

    return (
        <PenaltyContainer>
            <PenaltyHeader>
                <PenaltyMenuHeader>사유</PenaltyMenuHeader>
                <PenaltyMenuHeader>페널티 수준</PenaltyMenuHeader>
                <PenaltyInputHeader>비고</PenaltyInputHeader>
            </PenaltyHeader>
            {penalties.map((penalty, index) => (
                <PenaltyRow key={index}>
                    <PenaltyMenu
                        menuItems={menuItems}
                        isOpen={openMenuIndex === index}
                        onToggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                        onSearch={(selectedItem) => updatePenalty(index, { ...penalty, reason: selectedItem })}
                    />
                    <PenaltyMenu
                        menuItems={levelItems}
                        isOpen={openLevelIndex === index}
                        onToggle={() => setOpenLevelIndex(openLevelIndex === index ? null : index)}
                        onSearch={(selectedItem) => updatePenalty(index, { ...penalty, reason: selectedItem })}
                    />
                    <RemarkInput
                        value={penalty.remark}
                        onChange={(e) => updatePenalty(index, { ...penalty, remark: e.target.value })}
                        placeholder="비고"
                    />
                </PenaltyRow>
            ))}
            <AddPenaltyText onClick={addPenalty}>페널티 추가하기</AddPenaltyText>
            <ButtonContainer>
                <ButtonWrapper>
                    <Button onClick={clearPenalties} text={"모두 삭제"} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button text="확인" onClick={uploadPenalties} />
                </ButtonWrapper>
            </ButtonContainer>
            {alertModal && 
                <Modal
                    title='내용을 입력하세요'
                    description='비고란에 빈 값이 존재합니다.'
                    onClose={closeAlertModal} 
                />
            }
            {confirmModal && 
                <Modal
                    title='됐도이'
                    description='모든 비고 값이 입력되었습니다.'
                    onClose={closeConfirmModal} 
                />
            }
        </PenaltyContainer>
    );
};

export default PenaltyManage;

// Style
const PenaltyContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const PenaltyHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const PenaltyMenuHeader = styled.div`
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PenaltyInputHeader = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PenaltyRow = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    margin: 10px 0px;
    align-items: center;
`;

const RemarkInput = styled.input`
    flex: 2;
    height: 35px;
    padding: 0 10px;
    border: 1px solid #686868;
    border-radius: 10px;

    &:focus {
        outline: none;
        border: 1.5px solid #686868;
    }
`;

const AddPenaltyText = styled.div`
    margin-top: 10px;
    cursor: pointer;
    color: black;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;