import { useAuth } from "../contexts/AuthContext";
import { message } from 'antd';
import { useState } from 'react';

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('codenethub.telacad.ro/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            message.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useSignup;
