import { useState } from "react";
import SearchBox from "../../common/SearchBox";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import Title from "./Title";
import Pagination from "./Pagination";
import Image from "./Image";
import Header from "../../../pages/admin/Header";

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
    
    return(
        <div>
            <Header />
            <Title imageSrc="/img/vehicle-step.png" title="인수 보고서" />
            <SearchBox 
                menuItems={['Option1', 'Option2', 'Option3']}
                onSearch={handleSearch}
            />
            <Button text="열기" onClick={openModal} />
            {isModalOpen && (
                <Modal
                title="모달 창 제목"
                description="모달 창 설명"
                onClose={closeModal}
                />
            )}
            <Input width="300px" placeholder="하이" />
            <Input placeholder="width 설정 안 함" />

            <Image imageUrl="/img/car.png" />
            <Image imageUrl="https://example.com/valid-image.jpg" />


            <Pagination totalPages={10} pagesPerGroup={10}/>
        </div>
    );
}

export default AdminTest;