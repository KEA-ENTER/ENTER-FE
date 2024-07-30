import { useState } from "react";
import styled from "styled-components";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import LotteryList from "./LotteryList";

export default function Lottery () {
    const [page, setPage] = useState(1);
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        console.log('현재: ', newPage);
        console.log(page)
    }
    return(
        <Container>
            <Title imageSrc="/img/lottery.png" title="추첨 관리" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['회차', '차량 정보']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <LotteryList />
            <Pagination totalPages={10} onPageChange={handlePageChange} />
        </Container>
    );
}

const Container = styled.div`
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;
