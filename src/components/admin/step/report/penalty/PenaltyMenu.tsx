import { useState } from 'react';
import styled from "styled-components";

interface PenaltyMenuProps {
    menuItems: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSearch: (selectedItem: string) => void;
}

const PenaltyMenu: React.FC<PenaltyMenuProps> = ({ menuItems, isOpen, onToggle, onSearch }) => {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        onSearch(item);
        onToggle();
    }

    return (
        <SearchComp>
            <DropdownContainer>
                <DropdownButton onClick={onToggle} isopen={isOpen}>
                    <ButtonText>{selectedItem}</ButtonText>
                    <ButtonIcon>{isOpen ? '▲' : '▼'}</ButtonIcon>
                </DropdownButton>
                {isOpen && (
                    <DropdownList>
                        {menuItems.map(item => (
                            <DropdownItem 
                                key={item} 
                                onClick={() => handleSelect(item)}
                                className={item === selectedItem ? 'selected' : ''}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownList>
                )}
            </DropdownContainer>
        </SearchComp>
    );
}
export default PenaltyMenu;

// Style
const SearchComp = styled.div`
    height: 100%;
    display: flex;
`;

const DropdownContainer = styled.div`
    height: 100%;
    width: 170px;
    margin-right: 5%;
    position: relative;
    display: flex;
    align-items: center;
`;

const DropdownButton = styled.button<{ isopen: boolean }>`
    height: 100%;
    width: 100%;
    border-radius: ${(props) => (props.isopen ? '10px 10px 0 0' : '10px')};
    background-color: #Fee500;
    border: 1px solid #686868;
    border-width: ${(props) => (props.isopen ? '1px 1px 0px 1px': '0px 0px 0px 0px')};
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    position: relative;
`;

const ButtonText = styled.span`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
`;

const ButtonIcon = styled.span`
    margin-left: auto;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0px;
    padding: 0px;
    list-style: none;
    border: 1px solid #686868;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background-color: white;
    max-height: 150px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const DropdownItem = styled.li`
    height: 30px;
    width: 100%;
    padding: 0px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #eeeeee;
    }

    &.selected {
        background-color: #dddddd;
    }
`;
