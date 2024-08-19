
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DateString from "../basic/DateString";
import Title from "../basic/Title";
import SearchBox from "../../common/SearchBox";
import LotteryDetailList from "./LotteryDetailList";
import LotteryDetailListModel from "../../../API/admin/lottery/LotteryDetailListModel";

interface LotteryDetailItem {
    email: string;
    name: string;
    purpose: string;
    isWinning: boolean;
    applyTime: string;
}

function Query() {
    return new URLSearchParams(useLocation().search);
}

export default function LotteryDetail () {
    const [lotteryDetailData, setLotteryData] = useState<LotteryDetailItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [round, setRound] = useState("");
    const [date, setDate] = useState("");
    const [vehicle, setVehicle] = useState("");

    const query = Query();
    const type = query.get("type") ?? "ALL";
    const word = query.get("q") ?? "";
    const page = query.get("page") ?? "1";
    const { applyRound } = useParams<{ applyRound: string }>();

    useEffect(() => {
        const pageNum = parseInt(page) - 1;

        LotteryDetailListModel(word, type, pageNum, applyRound).then(res => {
            if (res) {
                setLotteryData(res.applicantList); 
                setTotalPage(res.totalPages);
                setRound(res.round);
                setDate(res.takeDate);
                setVehicle(res.vehicleModel);
            }
        });
    }, [type, word, page, applyRound]);

    const handleSearch = (selectedItem: string, searchText: string) => {
        console.log(`Selected Item: ${selectedItem}, Search Text: ${searchText}`);
    }

    return(
        <Container>
            <Title imageSrc="/img/vehicle-step.png" title="추첨 관리" />
            <DetailTitle>{`신청 내역: ${round}회차 / ${DateString(date)} / ${vehicle}`}</DetailTitle>
            <SearchBoxContainer>
                <SearchBox
                    menuItems={['아이디', '신청자명']}
                    onSearch={handleSearch}
                />
            </SearchBoxContainer>
            <LotteryDetailList lotteryDetailData={lotteryDetailData} totalPage={totalPage} />
        </Container>
    );
}

const Container = styled.div`
    width: 850px;
`;

const DetailTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const SearchBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
`;
