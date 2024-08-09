import styled from "styled-components";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import LotteryList from "./LotteryList";

export default function Lottery () {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <TitleStyle imageSrc="/img/lottery.png" title="추첨 관리" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['회차', '차량정보']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <LotteryList />
            <Pagination totalPages={10} />
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const TitleStyle = styled(Title)`
    margin: 10px 0px;
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
