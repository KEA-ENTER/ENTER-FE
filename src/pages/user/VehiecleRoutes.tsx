import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import autoRouting from '../../API/user/autoRouting';
import useUserStore from '../../stores/userStore';

const VehiecleRoutes = () => {
    const navigate = useNavigate();
    const { name, role, accessToken } = useUserStore((state) => ({
        name: state.name,
        role: state.role,
        accessToken: state.accessToken,
    }));
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        console.log('VehiecleRoutes');
        const fetchAutoRouting = async () => {
            try {
                const autoRoutingResponse = await autoRouting();
                setUser(name, role, accessToken, autoRoutingResponse.userState);
                console.log(autoRoutingResponse.routingId);
                switch (autoRoutingResponse.routingId) {
                    case 1:
                        navigate('/application');
                        break;
                    case 2:
                        navigate('/detail');
                        break;
                    case 3:
                        navigate('/detail');
                        break;
                    case 4:
                        navigate('/lottery-result');
                        break;
                    default:
                        console.error('Unknown routingId:', autoRoutingResponse.routingId);
                        break;
                }
            } catch (error) {
                console.error('Error during auto-routing:', error);
            }
        };

        fetchAutoRouting();
    }, [navigate, setUser, name, role, accessToken]);

    // 컴포넌트가 아무것도 렌더링하지 않도록 null 반환
    return null;
};

export default VehiecleRoutes;
