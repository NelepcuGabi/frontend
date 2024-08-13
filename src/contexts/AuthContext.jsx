import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get('accessToken');
        const storedRefreshToken = Cookies.get('refreshToken');

        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            fetchUserData(storedToken);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            if (error.response?.status === 401) {
                await refreshTokenFunction(); // Attempt to refresh the token
            } else {
                logout(); // Log out if unable to refresh
            }
        }
    };

    const refreshTokenFunction = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`, {
                refreshToken
            });
            const { newToken, newRefreshToken } = response.data;
            Cookies.set('accessToken', newToken, { expires: 7, secure: true, sameSite: 'Lax' });
            Cookies.set('refreshToken', newRefreshToken, { expires: 30, secure: true, sameSite: 'Lax' });
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            fetchUserData(newToken); // Retry fetching user data
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout(); // Log out if refresh fails
        }
    };

    const login = async (newToken, newData, newRefreshToken) => {
        Cookies.set('accessToken', newToken, { expires: 7, secure: true, sameSite: 'Lax' });
        Cookies.set('refreshToken', newRefreshToken, { expires: 30, secure: true, sameSite: 'Lax' });
        setToken(newToken);
        setRefreshToken(newRefreshToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setUserData(null);
        setIsAuthenticated(false);
        // Optional: Redirect user to the login page
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
