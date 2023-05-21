import { useParams } from "react-router-dom";
import { BookLayout } from "../layout/BookLayout"
import { BookItem, Comentarios } from "../components";
import { Grid, useMediaQuery } from "@mui/material";
import { Categorias } from "../components/Categorias";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../../store/book/bookSlice";
import { useEffect, useState } from "react";

export const BookPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const book = useSelector((state) => state.book.book);
  const comentarios = useSelector((state) => state.book.book.reseñas);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/v1/book/${id}`);
      const data = await response.json(); // Extraer los datos de la respuesta

      dispatch(setBook(data));
    } catch (error) {
      // Manejar errores
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width:800px)'); // Verificar si es un dispositivo móvil

  return (
    <BookLayout>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row'  }}>
          <Grid item>
            <BookItem book={book}/>
          </Grid>

          {!isMobile && (
            <Grid item>
              <Categorias />
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Comentarios comentarios={comentarios}/>          
        </Grid>
      </Grid>
    </BookLayout>
  )
}
