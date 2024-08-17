import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import autoRouting from '../../API/user/autoRouting';
import useUserStore from '../../stores/userStore';

const VehiecleRoutes = () => {
    const navigate = useNavigate();

    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const fetchAutoRouting = async () => {
            try {
                const autoRoutingResponse = await autoRouting();

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
    }, [navigate, setUser]);

    return null;
};

export default VehiecleRoutes;
