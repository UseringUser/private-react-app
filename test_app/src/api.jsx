import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const loginUser = async (credentials) => {
    try {
        const params = new URLSearchParams();
        for (const key in credentials) {
            params.append(key, credentials[key]);
        }

        const response = await axios.post(
            `${BASE_URL}/auth/token`,
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Couldnt resolve login:", error);
        throw error;
    }
};

const registerUser = async (userData) => {
    try {
        await axios.post(`${BASE_URL}/auth/register`, userData);
    } catch (error) {
        console.error("Couldnt resolve registration:", error);
        throw error;
    }
};

const fetchUser = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/current/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Couldnt resolve user fetch:", error);
        throw error;
    }
};

const fetchProducts = async () => {
    const token = localStorage.getItem("token")
    try{
        const response = await axios.get(`${BASE_URL}/products/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    } catch (error) {
        console.error("Couldnt resolve product fetch:", error)
        throw error
    }
};

const deleteProduct = async (name) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${BASE_URL}/product/delete/`, {
            params: { name }, 
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Couldnt resolve product deletion:", error);
        throw error;
    }
};


const productAdd = async (productData) => {
    const token = localStorage.getItem("token")
    try{
        await axios.post(`${BASE_URL}/product/add/`, productData, {
            headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        console.error("Couldnt resolve product add:", error)
        throw error
    }
}


export { loginUser, registerUser, fetchUser, fetchProducts, deleteProduct, productAdd };