import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/icon/back.png';

export default function BackButton() {
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(-1);
    };

    return (
        <StyledButton onClick={backHandler}>
            <Img src={back} />
        </StyledButton>
    );
}

const StyledButton = styled.button`
    margin-right: 10px;
    // padding: 13px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    background-color: none;
    background: none;
    color: 'black';
`;

const Img = styled.img`
    width: 30px;
`;
