import api, { setAuthorizationToken } from '../../AxiosInstance';

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const LotteryListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

    // 프론트에서 사용하는 한글로 된 검색 키워드를 서버용으로 변환
    let typeEng = 'ALL';
    switch (type) {
        case '회차':
            typeEng = 'ROUND';
            break;
        case '차량정보':
            typeEng = 'VEHICLE';
            break;
        default:
            break;
    }

    // api 불러오는 부분
    // import.meta.env.VITE_SERVER_URL: 우리 서버 url
    // api.get => api: 다현이가 작성한 axios 모듈(안에 디폴트로 토큰이 들어가 있음) / get: http 메소드 종류 - post, patch 등으로 변경 가능
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/lotteries`, {
            params: {
                keyword: name,
                searchType: typeEng,
                page: page,
                size: 8,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null;
    }
};

export default LotteryListModel;
