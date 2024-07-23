import { useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PageButton
                    key={i}
                    onClick={() => handlePageChange(i)}
                    isActive={currentPage === i}
                >
                    {i}
                </PageButton>
            );
        }
        return pages;
    };

    return (
        <PaginationContainer>
            <NavButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                〈〈
            </NavButton>
            <NavButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                〈
            </NavButton>
            {renderPages()}
            <NavButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: ${props => props.isActive ? '#bbb' : 'white'};
    color: ${props => props.isActive ? 'white' : 'black'};
    border: 0px solid #eee;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.isActive ? '#dddddd' : '#f0f0f0'};
    }
`;

const NavButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: white;
    color: black;
    border: 1px solid #ddd;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        color: #999;
    }
    &:hover:not(:disabled) {
        background-color: #eeeeee;
    }
`;
