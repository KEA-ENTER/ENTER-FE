import { useState } from "react";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import StepList from "./StepList";
import styled from "styled-components";

export default function Step() {
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
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['차량 정보', '인수자명', '상태']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <StepList />
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
`;
