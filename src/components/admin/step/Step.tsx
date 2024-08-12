import styled from "styled-components";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import StepList from "./StepList";

export default function Step() {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['차량정보', '인수자명', '상태']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <StepList />
            <Pagination totalPages={10} />
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
