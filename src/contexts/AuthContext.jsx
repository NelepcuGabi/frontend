import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get('accessToken');
        console.log('Stored Token:', storedToken); // Verifică dacă token-ul este corect

        if (storedToken) {
            setToken(storedToken);
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
            logout(); // Deconectează utilizatorul dacă datele nu pot fi obținute
        }
    };

    const login = async (newToken, newData) => {
        Cookies.set('accessToken', newToken, { expires: 999999 }); // Asigură-te că setarea expirării este corectă
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
        console.log('Logged in with Token:', newToken); // Log pentru debugging
    };

    const logout = () => {
        Cookies.remove('accessToken');
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
        // Opțional: redirecționează utilizatorul către pagina de login
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
