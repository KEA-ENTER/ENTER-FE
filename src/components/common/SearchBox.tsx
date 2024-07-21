import React, { useState } from 'react';
import * as S from "./SearchBoxStyle";

interface SearchBoxProps {
    menuItems: string[];
    onSearch: (selectedItem: string, searchText: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ menuItems, onSearch }) => {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);
    const [searchText, setSearchText] = useState("");
    const [isopen, setIsopen] = useState(false);

    const handleSearch = () => {
        onSearch(selectedItem, searchText);
    }

    const toggleDropdown = () => {
        setIsopen(!isopen);
    }

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsopen(false);
    }

    return (
        <S.SearchComp>
            <S.DropdownContainer>
                <S.DropdownButton onClick={toggleDropdown} isopen={isopen}>
                    <S.ButtonText>{selectedItem}</S.ButtonText>
                    <S.ButtonIcon>{isopen ? '▲' : '▼'}</S.ButtonIcon>
                </S.DropdownButton>
                {isopen && (
                    <S.DropdownList>
                        {menuItems.map(item => (
                            <S.DropdownItem 
                                key={item} 
                                onClick={() => handleSelect(item)}
                                className={item === selectedItem ? 'selected' : ''}
                            >
                                {item}
                            </S.DropdownItem>
                        ))}
                    </S.DropdownList>
                )}
            </S.DropdownContainer>
            <S.InputComp>
                <S.Input 
                    type="text" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <S.Button onClick={handleSearch} src="public/img/search.png" alt="Search"/>
            </S.InputComp>
        </S.SearchComp>
    );
}
