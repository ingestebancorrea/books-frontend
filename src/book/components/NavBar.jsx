import React, { useState } from 'react'
import { LogoutOutlined, MenuOutlined, Search } from '@mui/icons-material'
import { AppBar, Button, Grid, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme, useThemeProps } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useCheckAuth } from '../../hooks'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth'
import { Controller, useForm } from 'react-hook-form'
import { setSearchResults } from '../../store/book/bookSlice'

export const NavBar = () => {

  const { palette } = useTheme();

  const { status } = useCheckAuth();

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const isMobile = useMediaQuery('(max-width:600px)'); // Verificar si es un dispositivo móvil

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(startLogout());
  }

  const onSubmit = async (data) => {
    const url = `http://localhost:3002/api/v1/books/find?topicsInterest=${data.topicoInteres}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Almacenar los resultados de búsqueda en el store utilizando Redux
        dispatch(setSearchResults(data));

        navigate('/books/search/results');
      })
      .catch(error => {
        // Manejar errores
        console.error(error);
      });
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: '100%' },
        ml: { sm: '100%' }
      }}
    >
      <Toolbar>
        <Grid container direction='row' alignItems='center' spacing={2}>
          <Grid item>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>TECNOLIBROS</Link>
          </Grid>

          <Grid item sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)} sx={{ width: '60%' }}>
              <Controller
                name="topicoInteres"
                control={control}
                defaultValue=""
                rules={{ required: 'Este campo es obligatorio' }}
                render={({ field }) => (
                  <InputBase
                    placeholder="Busca libros por tópicos de interés"
                    inputProps={{ 'aria-label': 'search' }}
                    sx={{
                      backgroundColor: 'white',
                      width: '80%',
                      borderRadius: '4px',
                      pl: '10px',
                      fontSize: '12px', // Tamaño de letra en pantalla pequeña
                      '@media (min-width: 600px)': {
                        fontSize: '18px', // Tamaño de letra en pantalla más grande
                        width: '40%',
                      }
                    }}
                    {...field}
                  />
                )}
              />
            </form>
          </Grid>

          {!isMobile ? (
            <Grid item>
              {status === 'authenticated' ? (
                <IconButton
                  color='error'
                  onClick={onLogout}
                >
                  <LogoutOutlined />
                </IconButton>
              ) : (
                <>
                  <Button color="inherit" >
                    <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white' }}>Ingresar</Link>
                  </Button>
                  <Button color="inherit" >
                    <Link to="/auth/register" style={{ textDecoration: 'none', color: 'white' }}>Registrarse</Link>
                  </Button>
                </>
              )}
            </Grid>
          ) : (
            <Grid item>
              {status === 'authenticated' ? (
                <IconButton
                  color='error'
                  onClick={onLogout}
                >
                  <LogoutOutlined />
                </IconButton>
              ) : (
                <IconButton
                  color='inherit'
                  edge='end'
                  aria-label='menu'
                  onClick={handleMenuOpen}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  <MenuOutlined />
                </IconButton>
              )}

            </Grid>
          )}

          {(isMenuOpen) && (
            <Grid
              container
              direction='column'
              alignItems='center'
              spacing={2}
              justifyContent='center'
              sx={{
                position: 'fixed',
                top: '64px', // Altura de la barra de navegación
                left: 0,
                right: 0,
                background: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1,
                py: 1,
                px: 2,
                display: { xs: 'flex', md: 'none' },
                bgcolor: palette.secondary.main
              }}
              onClick={handleMenuClose}
            >
              <Grid item>
                <Button color="inherit" >
                  <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white' }}>Ingresar</Link>
                </Button>

              </Grid>
              <Grid item>
                <Button color="inherit" >
                  <Link to="/auth/register" style={{ textDecoration: 'none', color: 'white' }}>Registrarse</Link>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}