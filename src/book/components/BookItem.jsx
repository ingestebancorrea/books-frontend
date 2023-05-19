import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CloseOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import useModal from "../../hooks/useModal";
import { Controller, useForm } from "react-hook-form";
import useComentarios from "../hook/useComentarios";

export const BookItem = ({ data, onAgregarComentario }) => {

  const { _id, titulo, image_url, nombre_autor, visitas, fecha_publicacion } = data;

  const [rating, setRating] = useState(0);

  const { palette } = useTheme();

  const { handleOpen, handleClose, ModalComponent } = useModal();

  const handleRatingChange = (event, newValue) => {
    console.log(event.target.value);
  };

  const { control, handleSubmit, reset } = useForm();

  const { agregarComentario } = useComentarios();

  const onSubmit = async (_id,data) => {
    try {
      agregarComentario(_id,data);
      handleClose();
      onAgregarComentario();//Indicar que se agrego un nuevo comentario
      reset();//Limpia campo de texto
    } catch (error) {
      // Manejar errores
    }
  };

  return (
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
          key={_id}
        >
          <Grid item xs={5}>
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%" }}
              image={image_url}
              alt="Descripción de la imagen"
            />
          </Grid>
          <CardContent component={Grid} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }} xs={7}>
            <Box>
              <Typography variant="h5" component="div">
                {titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nombre_autor}
              </Typography>
              <Typography variant="body2" color="text.secondary">{fecha_publicacion}</Typography>
              <Typography variant="body2" color="text.secondary">Visitas: {visitas}</Typography>
            </Box>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }}>
              <Typography>Calificar:</Typography>
              <Rating
                name="star-rating"
                value={rating}
                onChange={handleRatingChange}
                onClick={handleOpen}
              />

              <ModalComponent>
                <Grid container justifyContent="center" sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5">Deja una respuesta</Typography>
                    </Box>
                    <IconButton onClick={handleClose}>
                      <CloseOutlined />
                    </IconButton>
                  </Grid>

                  <form onSubmit={handleSubmit((data) => onSubmit(_id, data.comentario))}>
                    <Grid item sx={{ pt: '10px' }}>
                      <Controller
                        name="comentario"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Este campo es obligatorio' }}
                        render={({ field, fieldState }) => (
                          <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            placeholder="Deja tu comentario aqui..."
                            {...field}
                            error={fieldState.error !== undefined}
                            helperText={fieldState.error && fieldState.error.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item sx={{ pt: '10px' }}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: palette.primary.main, color: 'white' }}
                        type="submit"
                      >
                        Publicar Comentario
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </ModalComponent>

              <Button variant="contained" sx={{ backgroundColor: palette.primary.main }}>
                <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body1" component="span">
                    7.4
                  </Typography>
                  <StarBorderOutlined />
                </Link>
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

}