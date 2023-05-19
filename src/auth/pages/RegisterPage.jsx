import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

export const RegisterPage = () => {
  const { errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {  
    const isRegisterValid = await dispatch( startCreatingUserWithEmailPassword(data) );

    if(isRegisterValid){
      navigate('/');
    }
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <Controller
                name="displayName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({field}) => (
                  <TextField 
                    {...field}
                    label="Nombre completo" 
                    type="text" 
                    placeholder="Nombre completo"
                    fullWidth
                    error={ !!errors.displayName }
                    helperText={errors.displayName ? "Este campo es requerido" : null}
                />
                )}
              >
              </Controller>
            </Grid>

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
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
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

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button
                  disabled={false} 
                  type="submit"
                  variant="contained" 
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink } color='inherit' to='/auth/login'>
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}