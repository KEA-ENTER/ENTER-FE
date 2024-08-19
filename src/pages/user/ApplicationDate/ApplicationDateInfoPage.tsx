import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옵니다.
import Title from '../../../components/user/UI/Title';
import SubTitle from '../../../components/user/UI/SubTitle';
import Button from '../../../components/user/UI/Button';


//서비스 이용일 안내 페이지
export default function ApplicationDateInfoPage() {
    const navigate = useNavigate();

    const handleInquiryClick = () => {
        navigate('/question');
    };

    return (
        <Container>
            <Title title="신청 일정 확인" />
            <SubTitle subTitle="매주 월요일, 화요일에 신청을 받고 있어요" />
            <List>
                <ListItem>차량 이용은 주말, 주중 공휴일에만 가능해요</ListItem>
                <ListItem>
                    <Highlight>신청일</Highlight>은 매주 월요일, 화요일이에요
                </ListItem>
                <ListItem>
                    <Highlight>추첨일</Highlight>은 매주 수요일!
                </ListItem>
                <ListItem>
                    추첨 이후 생긴 여유 차량에 대한 <Highlight>재배정</Highlight>은 매주 목요일, 금요일에 해요.
                </ListItem>
                <ListItem>질문이 있으면 아래 버튼을 통해 문의주세요</ListItem>
            </List>
            <ButtonContainer>
                <Button onClick={handleInquiryClick}>문의하기</Button>{' '}
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`;

const List = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
    overflow-wrap: break-word; /* 단어 단위로 줄 바꿈 */
`;

const Highlight = styled.span`
    font-weight: bold;
    color: #000;
`;

const ButtonContainer = styled.div`
    text-align: center;
`;
