import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export const BookCard = ({ data }) => {
  
    const {palette} = useTheme();

    const onClick = async(id) => {
      await fetchAndUpdateBookVisite(id);
    }

    const fetchAndUpdateBookVisite = async (id) => {
      await fetch(`http://localhost:3002/api/v1/book/${id}/visite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        } 
      });
    }

    return (
      <Grid container spacing={2} justify="center" alignItems="stretch">
        {data.map((item) => (
          <Grid item key={item._id}>
            <Card
              component={Grid}
              container
              spacing={0}
              sx={{ width: "420px", height:"100%" }}
            >
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{ height: "100%", width: "100%" }}
                  image={item.image_url}
                  alt="Descripción de la imagen"
                />
              </Grid>
              <CardContent component={Grid} item xs={8} sx={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', alignItems: 'start', flexGrow: 1}}>
                  <Box>
                    <Typography variant="h5" component="div">
                      {item.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.nombre_autor}
                    </Typography>
                  </Box>
                <CardActions>
                  <Button variant="outlined" onClick={() => onClick(item._id)}>
                    <Link to={`/book/${item._id}`} style={{textDecoration:'none', color: palette.primary.main}}>Mas Información</Link>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
};
