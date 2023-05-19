import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({ 
    name: 'book',
    initialState: {
        searchResults: []
    },
    reducers: {
        setSearchResults: (state, action) => {
          state.searchResults = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setSearchResults } = bookSlice.actions;