import { useSelector } from "react-redux"
import { BookCard } from "../components"
import { BookLayout } from "../layout/BookLayout"
import { Alert, Grid, Typography } from "@mui/material";

export const BooksSearchPage = () => {

  const { searchResults }  = useSelector(state => state.book);
  console.log(searchResults);
  return (
    <BookLayout>
      {
        searchResults.length >= 1
        ? <BookCard data={searchResults}/>
        : <Grid container>
          <Grid item>
            <Alert severity="error">No hay resultados de búsqueda.</Alert>
          </Grid>
        </Grid>
      }
    </BookLayout> 
  )
}
