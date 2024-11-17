import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants';

const api = axios.create({
    baseURL: 'https://www.cheapshark.com/api/1.0'
});

export const searchGames = async (params) => {
    try {
        const response = await api.get(API_ENDPOINTS.GAMES, { params });
        return response.data;
    } catch (error) {
        throw new Error(ERROR_MESSAGES.API_ERROR);
    }
};

export const getStores = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.STORES);
        return response.data;
    } catch (error) {
        throw new Error(ERROR_MESSAGES.STORE_ERROR);
    }
};