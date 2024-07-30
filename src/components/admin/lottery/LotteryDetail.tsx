import { useState } from "react";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import LotteryDetailList from "./LotteryDetailList";

export default function LotteryDetail () {
    const { round } = useParams<{ round: string }>();
    const { date } = useParams<{ date: string }>();
    const { id } = useParams<{ id: string }>();
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
            <Title imageSrc="/img/vehicle-step.png" title="신청 내역" />
            <DetailTitle>{round}회차 / {date} / {id}</DetailTitle>
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['아이디', '신청자명', '결과']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <LotteryDetailList />
            <Pagination totalPages={10} onPageChange={handlePageChange} />
        </Container>
    );
}

const Container = styled.div`
`;

const DetailTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;
