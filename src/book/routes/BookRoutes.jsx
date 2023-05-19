import { Navigate, Route, Routes } from "react-router-dom"
import { BooksPage, BookPage, BooksSearchPage } from "../pages"

export const BookRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <BooksPage/> } />
        <Route path="book/:id" element={<BookPage />} />
        <Route path="books/search/results" element={<BooksSearchPage/>} />
        <Route path="/*" element={ <Navigate to="/"/> }/>
    </Routes>
  )
}