import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

const store = configureStore({
    reducer: {
        games: gameReducer
    }
});

export default store;