import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { CloseOutlined, StarBorderOutlined } from '@mui/icons-material';
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";
import useComentarios from "../hook/useComentarios";
import { useParams } from "react-router-dom";

export const ModalComponent = ({ handleClose, rating }) => {
    const { id } = useParams();

    const { control, handleSubmit, reset } = useForm();

    const { palette } = useTheme();

    const { agregarComentario } = useComentarios();

    const onSubmit = async (data) => {
        try {
            agregarComentario(id, data.comentario, rating);
            handleClose();
            reset();
        } catch (error) {
            // Manejar errores
        }
    };

    return (
        <Grid container justifyContent="center" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5">Deja una respuesta</Typography>
                </Box>
                <IconButton onClick={handleClose}>
                    <CloseOutlined />
                </IconButton>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder="Deja tu comentario aquí..."
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
    );
};