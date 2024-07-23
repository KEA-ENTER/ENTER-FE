import { useState } from "react";
import SearchBox from "../../common/SearchBox";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import Title from "./Title";
import Pagination from "./Pagination";

function AdminTest() {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const [page, setPage] = useState(1);
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        console.log('현재: ', newPage);
        console.log(page)
    }

    return(
        <div>
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <SearchBox 
                menuItems={['Option 1', 'Option 2', 'Option 3']}
                onSearch={handleSearch}
            />
            <Button text="열기" onClick={openModal} />
            {isModalOpen && (
                <Modal
                title="모달 창 제목"
                description="이것은 모달 창의 설명입니다."
                onClose={closeModal}
                />
            )}
            <Input width="300px" placeholder="하이" />
            <Input placeholder="width 설정 안 함" />

            <Pagination totalPages={10} onPageChange={handlePageChange} />
        </div>
    );
}

export default AdminTest;