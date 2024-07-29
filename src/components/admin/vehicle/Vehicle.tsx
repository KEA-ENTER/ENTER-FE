import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../basic/Title";
import Pagination from "../basic/Pagination";
import SearchBox from "../../common/SearchBox";
import VehicleList from "./VehicleList";
import Button from "../basic/Button";
import styled from "styled-components";

export default function Vehicle() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        console.log('현재: ', newPage);
        console.log(page)
    }

    const goVehicleCreate = () => {
        navigate('/vehicle/create')
    }

    return(
        <div>
            <Title imageSrc="/img/car.png" title="차량 관리" />
            <SearchBoxContainer>
                <SearchBox 
                    menuItems={['모델', '차량 번호', '상태']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <Button text="차량 추가하기" onClick={goVehicleCreate}/>
            <VehicleList />
            <Pagination totalPages={10} onPageChange={handlePageChange} />
        </div>
    );
}

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`;
