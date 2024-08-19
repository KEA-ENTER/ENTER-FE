import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbsMenu: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split(/[/?]/).filter(x => x);

    const displayPathnames = pathnames.slice(0, 3);

    return (
        <BreadcrumbContainer>
            {displayPathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === displayPathnames.length - 1;

                return (
                    <BreadcrumbItem key={to} $islast={isLast}>
                        {isLast ? (
                            <span>{decodeURIComponent(value)}</span>
                        ) : (
                            <Link to={to}>{decodeURIComponent(value)}</Link>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </BreadcrumbContainer>
    );
};

export default BreadcrumbsMenu;

const BreadcrumbContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0px 0px 0px;
`;

const BreadcrumbItem = styled.div<{ $islast: boolean }>`
  margin-right: 5px;
  font-size: 14px;

  & > a, & > span {
    text-decoration: none;
    color: ${props => (props.$islast ? '#232d63' : '#aaa')};

    &:hover {
      text-decoration: ${props => (props.$islast ? 'none' : 'underline')};
    }
  }

  &:not(:last-child)::after {
    content: '/';
    margin-left: 5px;
    color: #aaa;
  }
`;
