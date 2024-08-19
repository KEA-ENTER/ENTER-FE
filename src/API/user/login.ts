import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    memberName: string;
    memberRole: string;
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${BASE_URL}/auth/login`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export default login;
