import useFetch from "../../hooks/useFetch";
import { BookCard } from "../components";
import { BookLayout } from "../layout/BookLayout";

export const BooksPage = () => {

  const data = useFetch('http://localhost:3002/api/v1/books','get');

  return (
    <BookLayout>
      <BookCard data={data}/>
    </BookLayout>
  )
}
