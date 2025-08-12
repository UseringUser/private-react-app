import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUser, registerUser, fetchProducts, productAdd, deleteProduct } from './api';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchUser(token);
                setUser(user);
            };
            getUser();
        }
    }, [token]);

    const login = async (username, password) => {
        const response = await loginUser({ username, password });
        if (response?.access_token) {
            setToken(response.access_token);
            const userAcc = await fetchUser(response.access_token);
            localStorage.setItem('token', response.access_token);
            setUser(userAcc);
            navigate('/main');
        }
    };

    const register = async (username, email, password) => {
        await registerUser({ username, email, password });
        navigate('/login');
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getProducts = async () => {
        const token = localStorage.getItem('token')
        const response = await fetchProducts(token);
        return response;
    }

    const addProduct = async (data) => {
        const token = localStorage.getItem('token')
        const response = await productAdd(data, token);
    }

    const productDeletion = async(name) => {
        const token = localStorage.getItem('token')
        const response = await productDelete(name, token)
    }

    return (
        <AppContext.Provider value={{ token, user, login, register, logout, getProducts, addProduct, productDeletion }}>
            {children}
        </AppContext.Provider>
    );
};

export {AppProvider, AppContext}