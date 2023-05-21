import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StarBorderOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import useModal from "../../hooks/useModal";
import { ModalComponent } from "./";

export const BookItem = ({ book }) => {
  const [rating, setRating] = useState(0);

  const { palette } = useTheme();

  const { handleOpen, handleClose, ModalComponent: Modal } = useModal();

  const handleRatingChange = (event, newValue) => {
    const ratingValue = event.target.value;
    setRating(newValue);
  };

  const parseValoration = (valoration) => {
    const parsedValoration = parseFloat(valoration).toFixed(2);
    return parsedValoration;
  };

  return book !== null ? (
    <Grid container spacing={2} justify="center" sx={{ pl: '35px' }}>
      <Grid item xs={12} sm={12} md={12} sx={{ maxWidth: '100%' }}>
        <Card
          component={Grid}
          container
          spacing={0}
          sx={{
            maxWidth: '100%',
            height: "100%",
            '@media (min-width: 600px)': {
              width: "800px",
            }
          }}

        >
          <Grid item xs={5}>
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%" }}
              image={book.image_url}
              alt="Descripción de la imagen"
            />
          </Grid>
          <CardContent component={Grid} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }} xs={7}>
            <Box>
              <Typography variant="h5" component="div">
                {book.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.nombre_autor}
              </Typography>
              <Typography variant="body2" color="text.secondary">{book.fecha_publicacion}</Typography>
              <Typography variant="body2" color="text.secondary">Visitas: {book.visitas}</Typography>
            </Box>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }}>
              <Typography>Calificar:</Typography>
              <Rating
                name="star-rating"
                value={rating}
                onChange={handleRatingChange}
                onClick={handleOpen}
              />

              <Modal>
                <ModalComponent handleClose={handleClose} rating={rating}/>
              </Modal>

              <Button variant="contained" sx={{ backgroundColor: palette.primary.main }}>
                <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body1" component="span">
                    {parseValoration(book.valoracion_libro)}
                  </Typography>
                  <StarBorderOutlined />
                </Link>
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item>
        <Alert severity="error">No se encontró el libro.</Alert>
      </Grid>
    </Grid>
  );
};