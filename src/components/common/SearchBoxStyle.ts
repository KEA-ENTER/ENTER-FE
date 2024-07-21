import styled from "styled-components";

export const SearchComp = styled.div`
    height: 30px;
    width: 330px;
    display: flex;
`;

export const DropdownContainer = styled.div`
    height: 100%;
    width: 30%;
    margin-right: 5%;
    position: relative;
    display: flex;
    align-items: center;
`;

export const DropdownButton = styled.button<{ isopen: boolean }>`
    height: 100%;
    width: 100%;
    border-radius: ${(props) => (props.isopen ? '10px 10px 0 0' : '10px')};
    background-color: white;
    border: 1px solid #686868;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
`;

export const ButtonText = styled.span`
    flex: 1;
    text-align: center;
`;

export const ButtonIcon = styled.span`
    margin-left: 8px;
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 98%;
    margin: 0px;
    padding: 0px;
    list-style: none;
    border: 1px solid #686868;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background-color: white;
    z-index: 1000;
    max-height: 150px;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
`;

export const DropdownItem = styled.li`
    height: 25px;
    width: 100%;
    padding: 0px;
    cursor: pointer;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #eeeeee;
    }

    &.selected {
        background-color: #cccccc;
        color: white;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InputComp = styled.div`
    height: 93%;
    width: 65%;
    border: 1px solid #686868;
    border-radius: 10px;
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    padding: 4px;
    border: none;
    border-radius: 10px;
    outline: none;
    flex: 1;
`;

export const Button = styled.img`
    height: 17px;
    width: 17px;
    padding: 4px 8px;
    border: none;
    cursor: pointer;
`;
