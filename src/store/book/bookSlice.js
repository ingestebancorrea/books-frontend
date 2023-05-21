import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        book: [
            {
                "_id": "",
                "titulo": "",
                "nombre_autor": "",
                "tipo_genero": "",
                "reseñas": [],
                "image_url": "",
                "fecha_publicacion": "",
                "topicos_interes": "",
                "valoracion_libro": "",
                "visitas": ""
            }
        ],
        searchResults: []
    },
    reducers: {
        setBook: (state, action) => {
            state.book = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setSearchResults, setBook } = bookSlice.actions;