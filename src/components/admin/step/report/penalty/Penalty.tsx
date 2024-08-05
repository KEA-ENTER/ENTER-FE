import styled from "styled-components";
import PenaltyManage from "./PenaltyManage";
import PenaltyList from "./PenaltyList";

export default function Penalty () {
    return(
        <Container>
            <PenaltyList />
            <PenaltyManage />
        </Container>
    );
}

const Container = styled.div`
    margin: 10px 0px;
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    border-radius: 0px;
`;
