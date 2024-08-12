import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../basic/Title";
import SearchBox from "../../common/SearchBox";
import Button from "../basic/Button";
import VehicleList from "./VehicleList";

export default function Vehicle() {
    const navigate = useNavigate();

    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    const goVehicleCreate = () => {
        navigate('create')
    }

    return(
        <Container>
            <Title imageSrc="/img/car.png" title="차량 관리" />
            <SearchBoxContainer>
                <SearchBox 
                    menuItems={['모델', '차량번호', '상태']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <AddBtnContainer>
                <Button text="차량 추가하기" onClick={goVehicleCreate}/> 
            </AddBtnContainer>
            <VehicleList />
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
    margin-bottom: 20px;
`;

const AddBtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;
