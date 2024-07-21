import { SearchBox } from "../../components/common/SearchBox";

export default function AdminTest() {
    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }
    return(
        <div>
            <SearchBox 
                menuItems={['Option 1', 'Option 2', 'Option 3']}
                onSearch={handleSearch}
            />
        </div>
    );
}