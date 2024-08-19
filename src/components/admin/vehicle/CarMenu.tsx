import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CarMenuProps {
    id: number;
    onCloseMenu: () => void;
    onOpenModal: () => void;
}

// 차량 리스트의 더보기 메뉴
const CarMenu: React.FC<CarMenuProps> = ({ id, onCloseMenu, onOpenModal }) => {
    const navigate = useNavigate();
    const goModifyPage = (id: number) => {
        onCloseMenu()
        navigate('/admin/vehicle/modify/'+id)
    }

    return (
        <DropdownList>
            <DropdownItem onClick={() => goModifyPage(id)}>
                수정하기
            </DropdownItem>
            <DropdownItem onClick={onOpenModal}>
                삭제하기
            </DropdownItem>         
        </DropdownList>
    );
};

export default CarMenu;

const DropdownList = styled.div`
    position: absolute;
    transform: translate(20%, -60%);
    width: 100px;
    list-style: none;
    border: 1px solid #68686868;
    border-radius: 10px;
    background-color: white;
    z-index: 10;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.div`
    height: 40px;
    padding: 5px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-color: #686868;
    &:hover {
        background: rgba(238, 238, 238, 0.6);
    }
`;
