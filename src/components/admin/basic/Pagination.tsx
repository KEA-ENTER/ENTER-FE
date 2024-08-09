import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PaginationProps {
    totalPages: number;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const query = Query();
    
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        query.set("page", page.toString());
        navigate({
            search: query.toString(),
        });
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PageButton
                    key={i}
                    onClick={() => handlePageChange(i)}
                    $isactive={currentPage === i}
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

const PageButton = styled.button<{ $isactive: boolean }>`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: ${props => props.$isactive ? '#bbb' : 'white'};
    color: ${props => props.$isactive ? 'white' : 'black'};
    border: 0px solid #eee;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.$isactive ? '#dddddd' : '#f0f0f0'};
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
