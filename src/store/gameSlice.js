import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    games: [],
    stores: [],
    loading: false,
    searchType: 'title',
    exactMatch: false,
    error: null
};

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames: (state, action) => {
            state.games = action.payload;
        },
        setStores: (state, action) => {
            state.stores = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
            if (action.payload === 'steamId') {
                state.exactMatch = false;
            }
        },
        setExactMatch: (state, action) => {
            state.exactMatch = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setGames,
    setStores,
    setLoading,
    setSearchType,
    setExactMatch,
    setError
} = gameSlice.actions;

export default gameSlice.reducer;