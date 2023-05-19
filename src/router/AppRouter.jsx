import { Navigate, Route, Routes } from "react-router-dom"
import { BookRoutes } from "../book/routes/BookRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

export const AppRouter = () => {  
  return (
    <Routes>
      <Route path="/*" element={<BookRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={ <Navigate to='/'/> }/>
    </Routes>
  )
}