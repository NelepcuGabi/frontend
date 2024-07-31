import { useAuth } from "../contexts/AuthContext";
import { message } from 'antd';
import { useState } from 'react';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const loginUser = async (values) => {
        try {
           
            console.log(backendURL)
            setError(null);
            setLoading(true);
            const res = await fetch(`165.22.95.36/api/auth/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 404) {
                setError(data.message);
            } else {
                message.error('Login failed');
            }
        } catch (error) {
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
