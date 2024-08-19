import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PaginationProps {
    totalPages: number;
    pagesPerGroup: number;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, pagesPerGroup }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const navigate = useNavigate();
    const query = Query();

    const totalGroups = Math.ceil(totalPages / pagesPerGroup);

    useEffect(() => {
        const group = Math.ceil(currentPage / pagesPerGroup);
        setCurrentGroup(group);
        const getPage = Number(query.get("page"))
        if (getPage) {
            setCurrentPage(getPage)
        } else {
            setCurrentPage(1)
        }
    }, [currentPage, pagesPerGroup, query]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        query.set('page', page.toString());
        navigate({
            search: query.toString(),
        });
    };

    const handleGroupChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentGroup > 1) {
            const newGroup = currentGroup - 1;
            setCurrentGroup(newGroup);
            handlePageChange((newGroup - 1) * pagesPerGroup + 1);
        } else if (direction === 'next' && currentGroup < totalGroups) {
            const newGroup = currentGroup + 1;
            setCurrentGroup(newGroup);
            handlePageChange((newGroup - 1) * pagesPerGroup + 1);
        }
    };

    const renderPages = () => {
        const pages = [];
        const startPage = (currentGroup - 1) * pagesPerGroup + 1;
        const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PageButton key={i} onClick={() => handlePageChange(i)} $isactive={currentPage === i}>
                    {i}
                </PageButton>,
            );
        }
        return pages;
    };

    return (
        <PaginationContainer>
            <NavButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                〈〈
            </NavButton>
            <NavButton onClick={() => handleGroupChange('prev')} disabled={currentGroup === 1}>
                〈
            </NavButton>
            {renderPages()}
            <NavButton onClick={() => handleGroupChange('next')} disabled={currentGroup === totalGroups}>
                〉
            </NavButton>
            <NavButton onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                〉〉
            </NavButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const PageButton = styled.button<{ $isactive: boolean }>`
    padding: 5px 10px;
    background-color: ${(props) => (props.$isactive ? '#bbb' : 'white')};
    color: ${(props) => (props.$isactive ? 'white' : 'black')};
    border: 0px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => (props.$isactive ? '#dddddd' : '#f0f0f0')};
    }
`;

const NavButton = styled.button`
    padding: 5px 8px;
    background-color: white;
    color: black;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 8px;

    &:disabled {
        cursor: not-allowed;
        color: #999;
    }
    &:hover:not(:disabled) {
        background-color: #eeeeee;
    }
`;
