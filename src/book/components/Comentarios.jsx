import { Box, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery } from "@mui/material"
import defaultAvatar from './../../assets/usuario.png';
import useComentarios from "../hook/useComentarios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Comentarios = ({ actualizarComentarios }) => {
  const { id } = useParams();
  
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const { comentarios, cargarComentarios } = useComentarios(); {/* Renderizar los comentarios */ }

  useEffect(() => {//Se ejecutara cada vez que 'actualizarComentarios' cambie, además volvera a cargar los comentarios y actualizara su estado
    cargarComentarios(id);
  }, [actualizarComentarios]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return `${day} de ${month} de ${year}`;
  };

  return (
    <Grid container alignItems="center" spacing={1} sx={{ pl: '20px' }}>
      {comentarios.map((item) => (
        <Grid item xs={12} sm={12} md={7.5} key={item.id}>
          <Card
            component={Grid}
            container
            sx={{
              width: '100%',
              height: 'min-content'
            }}>
            <Grid 
              item
              xs={2}
              sm={2} 
              md={2}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: '86px',
                  width: '84px',
                  borderRadius: '50%',
                  p: '5px',
                  '@media (max-width: 600px)': {
                    height: '60px',
                    width: '60px'
                  }
                }}
                image={item.image_url ? item.image_url : defaultAvatar}
                alt="Descripción de la imagen"
              />
            </Grid>
            <Grid 
              item
              xs={10}
              sm={10} 
              md={10}
            >
              <CardContent
                sx={{
                  pl: '2px'
                }}
              >
                <Box>
                  <Typography variant="h5" component="div" style={{ fontSize: isSmallScreen ? '14px' : '20px' }}>
                    {item.username} - {formatDate(item.fecha)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ fontSize: isSmallScreen ? '12px' : '14px' }}>
                    {item.comentario}
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}