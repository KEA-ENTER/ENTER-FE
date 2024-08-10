import styled from 'styled-components';
import SubTitle from '../../../components/user/UI/SubTitle';

const rentGuidelines = [
    '차량 대여 신청인만 운전이 가능해요.',
    '쾌적한 차량을 위해 전 차량 흡연은 금물!',
    '차량 외관 체크 후 차량 확인 사진을 등록해주세요.',
    '인수 시점과 연료 잔여량이 비슷하게 주유 후 반납 해주세요.',
    '안전한 운전 습관은 필수!',
    '총무부로 오셔서 차량 키 불출 받으시길 바랍니다.',
    '차량 위치는 [B3H] 입니다.',
    '차량 인수 후 앞 유리에 꼭 명함을 두셔야 합니다.',
    '차량 픽업은 이용일 전 날 오후 5시부터 가능합니다.',
    '사고가 나면 다음 번호로 연락하시길 바랍니다. (보험사 010-1111-2222)',
];

const returnGuidelines = [
    '지정 반납 구역에서만 반납이 가능해요',
    '차량에 두고간 물품이 없는지 다시 한 번 확인해주세요',
    '반납 전 차량 잠금 확인은 필수!',
    '인수시점과 비슷하게 주유 후 반납 해주세요',
    '차량 계기판 및 주차된 차량 사진을 등록해주세요',
    '차량 인수 후 앞 유리에 꼭 명함을 두셔야 합니다.',
    '사고가 나면 다음 번호로 연락하시길 바랍니다. (보험사 010-1111-2222)',
];

interface GuidelinesProps {
    type: 'rent' | 'return';
}

const Guidelines: React.FC<GuidelinesProps> = ({ type }) => {
    const guidelines = type === 'rent' ? rentGuidelines : returnGuidelines;

    return (
        <>
            <SubTitle subTitle="주의사항" />
            <ListContainer>
                {guidelines.map((item, index) => (
                    <List key={index}>{item}</List>
                ))}
            </ListContainer>
        </>
    );
};

export default Guidelines;

const ListContainer = styled.ul`
    margin-left: 20px;
    list-style-type: disc;
`;

const List = styled.li`
    margin: 5px;
    font-size: 15px;
    word-break: keep-all;
`;
