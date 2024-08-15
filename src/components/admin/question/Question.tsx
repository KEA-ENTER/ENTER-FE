import styled from "styled-components";
import Title from "../basic/Title";
import SearchBox from "../../common/SearchBox";
import QuestionList from "./QuestionList";

export default function Question () {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <TitleStyle imageSrc="/img/headphone.png" title="문의 관리" />
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['카테고리', '상태', '작성자']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <QuestionList />
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
