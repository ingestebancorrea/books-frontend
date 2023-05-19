import { useParams } from "react-router-dom";
import { BookLayout } from "../layout/BookLayout"
import { BookItem, Comentarios } from "../components";
import useFetch from "../../hooks/useFetch";
import { Grid, useMediaQuery } from "@mui/material";
import { Categorias } from "../components/Categorias";
import { useState } from "react";

export const BookPage = () => {
  const { id } = useParams();

  const data = useFetch(`http://localhost:3002/api/v1/book/${id}`, 'get');

  const [actualizarComentarios, setActualizarComentarios] = useState(false);

  const isMobile = useMediaQuery('(max-width:800px)'); // Verificar si es un dispositivo móvil

  const handleAgregarComentario = () => {
    setActualizarComentarios(!actualizarComentarios);//Se cambia el valor del state y provoca que se vuelva a renderizar el componente 'Comentarios'
  };

  return (
    <BookLayout>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row'  }}>
          <Grid item>
            <BookItem data={data} onAgregarComentario={handleAgregarComentario}/>
          </Grid>

          {!isMobile && (
            <Grid item>
              <Categorias />
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Comentarios actualizarComentarios={actualizarComentarios}/>          
        </Grid>
      </Grid>
    </BookLayout>
  )
}
