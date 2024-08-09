
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DateString from "../basic/DateString";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import LotteryDetailList from "./LotteryDetailList";


export default function LotteryDetail () {
    const { round } = useParams<{ round: string }>();
    const { date } = useParams<{ date: string }>();
    const { id } = useParams<{ id: string }>();

    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="추첨 관리" />
            <DetailTitle>{`신청 내역: ${round}회차 / ${DateString(date)} / ${id}`}</DetailTitle>
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['아이디', '신청자명', '결과']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <LotteryDetailList />
            <Pagination totalPages={10} />
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
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
