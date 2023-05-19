import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form';

export const LoginPage = () => {

  const { errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    const { email, password } = data;
    const isLoginValid = await dispatch(startLoginWithEmailPassword({ email, password }));

    if(isLoginValid){
      navigate('/');
    }
  }

  const onGoogleSignIn = async() => {
    const isGoogleLoginValid = await dispatch(startGoogleSignIn());

    if (isGoogleLoginValid) {
      navigate('/');
    }
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="email"
                  placeholder="correo@gmail.com"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? "Este campo es requerido" : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control} //Se utiliza para conectar el campo con el formulario
              rules={{ required: true }} //Reglas de validación para el campo
              defaultValue=""
              render={({ field }) => ( //función de renderizado
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? "Este campo es requerido" : null}
                />
              )}
            />
          </Grid>

          <Grid 
              container
              display={ !!errorMessage ? '' : 'none' }
              sx={{ mt: 1 }}
            >
              <Grid 
                item 
                xs={ 12 }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={false}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                disabled={false} 
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}