import React, { useState } from 'react';
import styled from "styled-components";
import Button from '../../../basic/Button';
import Modal from '../../../basic/Modal';
import ConfirmModal from '../../../basic/ConfirmModal';
import PenaltyMenu from './PenaltyMenu';
import PenaltyAddModel from '../../../../../API/admin/step/PenaltyAddModel';

interface IdProps {
    memberId: number;
}

// 페널티 관리 (페널티 추가) 컴포넌트
const PenaltyManage: React.FC<IdProps> = ({memberId}) => {
    const menuItems = ['인수', '반납', '연료', '파손', '기타'];
    const levelItems = ['매우 낮음', '낮음', '보통', '높음', '블랙리스트'];
    const [penalties, setPenalties] = useState<{ reason: string, level: string, etc: string }[]>([{ reason: menuItems[0], level: levelItems[0], etc: '' }]);
    const [errorModal, setErrorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [openLevelIndex, setOpenLevelIndex] = useState<number | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            uploadPenalties();
        }
    }

    // 페널티를 추가하기 위한 입력창을 하나 더 만든다.
    const addPenalty = () => {
        setPenalties([...penalties, { reason: menuItems[0], level: levelItems[0], etc: '' }]);
    };

    // 페널티를 추가하기 위한 입력창을 계속 반영한다.
    const updatePenalty = (index: number, updatedPenalty: { reason: string, level: string, etc: string }) => {
        const updatedPenalties = penalties.map((penalty, i) => i === index ? updatedPenalty : penalty);
        setPenalties(updatedPenalties);
    };

    // 페널티를 추가하기 위한 입력창을 초기화한다.
    const clearPenalties = () => {
        setPenalties([{ reason: menuItems[0], level: levelItems[0], etc: '' }]);
    };

    // 페널티를 업로드한다.
    const uploadPenalties = async () => {
        // 페널티 입력이 없을 시 경고창을 띄운다.
        const hasEmptyEtc = penalties.some(penalty => penalty.etc === '');
        if (hasEmptyEtc) {
            setErrorModal(true);
            return;
        }
    
        // 1 이상의 페널티를 하나씩 추가한다.
        for (const penalty of penalties) {
            const { reason, level, etc } = penalty;
            // 페널티 추가 API를 호출한다.
            const result = await PenaltyAddModel(memberId, reason, level, etc);
            if (!result) {
                window.alert('업로드 실패');
                return;
            }
        }
        setConfirmModal(true);
    };    

    const closeErrorModal = () => {
        setErrorModal(false);
    };

    const openAlertModal = () => {
        setAlertModal(true);
    };

    const closeAlertModal = () => {
        setAlertModal(false);
    };

    const closeConfirmModal = () => {
        setConfirmModal(false);
        window.location.reload();
    }

    const closeConfirmDeleteModal = () => {
        clearPenalties();
        setConfirmDeleteModal(false);
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
                        onSearch={(selectedItem) => updatePenalty(index, { ...penalty, level: selectedItem })}
                    />
                    <EtcInput
                        value={penalty.etc}
                        onChange={(e) => updatePenalty(index, { ...penalty, etc: e.target.value })}
                        placeholder="비고"
                        onKeyDown={handleKeyDown}
                    />
                </PenaltyRow>
            ))}
            <AddPenaltyText onClick={addPenalty}>페널티 추가하기</AddPenaltyText>
            <ButtonContainer>
                <ButtonWrapper>
                    <Button onClick={openAlertModal} text={"모두 삭제"} />
                </ButtonWrapper>
                <ButtonWrapper>
                    <Button text="추가" onClick={uploadPenalties} />
                </ButtonWrapper>
            </ButtonContainer>
            {errorModal && 
                <Modal
                    title='내용을 입력하세요'
                    description='비고란에 빈 값이 존재합니다.'
                    onClose={closeErrorModal} 
                />
            }
            {confirmModal && 
                <Modal
                    title='추가되었습니다.'
                    description=''
                    onClose={closeConfirmModal} 
                />
            }
            {alertModal &&(
                <ConfirmModal
                    title="정말 삭제하시겠습니까?"
                    description={''}
                    onClose={closeAlertModal}
                    setIsConfirmed = {setConfirmDeleteModal}
                />
            )}
            {confirmDeleteModal && (
                <Modal 
                    title="삭제되었습니다."
                    description=""
                    onClose={closeConfirmDeleteModal}
                />
            )}
        </PenaltyContainer>
    );
};

export default PenaltyManage;

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

const EtcInput = styled.input`
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
    font-size: 12px;
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