import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components";

export const BookLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        {/* NavBar */}
        <NavBar/>

        <Box 
            component='main'
            sx={{ 
              flexGrow: 1, 
              p:3,
              minHeight: '100vh'
            }}
        >
          <Toolbar/>  
          { children }
        </Box>

    </Box>
  )
}
