import styled from "styled-components";
import PenaltyManage from "./PenaltyManage";
import PenaltyList from "./PenaltyList";

interface IdProps {
    memberId: number;
}

// 페널티 컴포넌트
const Penalty: React.FC<IdProps> = ({memberId}) => {
    return(
        <Container>
            <PenaltyList memberId={memberId} />
            <PenaltyManage memberId={memberId} />
        </Container>
    );
}

export default Penalty;

const Container = styled.div`
    margin: 10px 0px;
    background: rgba(238, 238, 238, 0.6);
    padding: 20px;
    border-radius: 0px;
`;
