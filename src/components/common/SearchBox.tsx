import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";

interface SearchBoxProps {
    menuItems: string[];
    onSearch: (selectedItem: string, searchText: string) => void;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

const SearchBox: React.FC<SearchBoxProps> = ({ menuItems, onSearch }) => {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);
    const [searchText, setSearchText] = useState("");
    const [isopen, setIsopen] = useState(false);

    const navigate = useNavigate();
    const query = Query();

    const handleSearch = () => {
        query.set("type", selectedItem);
        query.set("q", searchText);
        query.delete("page")
        navigate({
            search: query.toString(),
        });
        onSearch(selectedItem, searchText);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const toggleDropdown = () => {
        setIsopen(!isopen);
    }

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsopen(false);
    }

    return (
        <SearchComp>
            <DropdownContainer>
                <DropdownButton onClick={toggleDropdown} $isopen={isopen}>
                    <ButtonText>{selectedItem}</ButtonText>
                    <ButtonIcon>{isopen ? '▲' : '▼'}</ButtonIcon>
                </DropdownButton>
                {isopen && (
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
            <InputComp>
                <Input 
                    type="text" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                <Button onClick={handleSearch} src="/img/search.png" alt="Search"/>
            </InputComp>
        </SearchComp>
    );
}
export default SearchBox;

// Style
const SearchComp = styled.div`
    height: 30px;
    width: 350px;
    display: flex;
`;

const DropdownContainer = styled.div`
    height: 100%;
    width: 40%;
    margin-right: 5%;
    position: relative;
    display: flex;
    align-items: center;
`;

const DropdownButton = styled.button<{ $isopen: boolean }>`
    height: 100%;
    width: 100%;
    border-radius: ${(props) => (props.$isopen ? '10px 10px 0 0' : '10px')};
    background-color: white;
    border: 1px solid #858585;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    position: relative;
`;

const ButtonText = styled.span`
    color: #686868;
    position: absolute;
    left: 45%;
    transform: translateX(-50%);
    font-size: 13px;
`;

const ButtonIcon = styled.span`
    color: #858585;
    font-size: 13px;
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
    border: 1px solid #858585;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background-color: white;
    z-index: 11;
    max-height: 150px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const DropdownItem = styled.li`
    color: #686868;
    font-size: 13px;
    height: 25px;
    width: 100%;
    padding: 0px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;

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

const InputComp = styled.div`
    height: 93%;
    width: 65%;
    border: 1px solid #858585;
    border-radius: 10px;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    padding: 4px;
    border: none;
    border-radius: 10px;
    outline: none;
    flex: 1;
`;

const Button = styled.img`
    height: 17px;
    width: 17px;
    margin-right: 8px;
    cursor: pointer;
`;