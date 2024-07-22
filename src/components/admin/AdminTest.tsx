import { useState } from "react";
import { SearchBox } from "../../components/common/SearchBox";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";

export default function AdminTest() {
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
        </div>
    );
}