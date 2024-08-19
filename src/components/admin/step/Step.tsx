import styled from "styled-components";
import Title from "../basic/Title";
import SearchBox from "../../common/SearchBox";
import StepList from "./StepList";

// 인수 관리 페이지
export default function Step() {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['차량정보', '인수자명']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <StepList />
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
