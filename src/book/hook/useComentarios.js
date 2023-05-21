import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setBook } from '../../store/book/bookSlice';


const useComentarios = ( ) => {
    const { id } = useParams();

    const { displayName, photoURL } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const cargarComentarios = async (id) => {
        try {
            // Realizar una solicitud para obtener los comentarios del servidor
            const respuesta = await fetch(`http://localhost:3002/api/v1/book/${id}`);
            const comentarios = await respuesta.json();

            //Actualizar comentarios
            if(comentarios){
                dispatch(setBook(comentarios));
            }
        } catch (error) {
            console.error('Error al cargar los comentarios:', error);
        }
    };

    const agregarComentario = async (_id, comentario, ratingValue) => {
        try {
            const requestBody = {
                username: displayName,
                comentario,
                fecha: new Date(),
                image_url: photoURL,
                valoracion: ratingValue
            };

            const response = await fetch(`http://localhost:3002/api/v1/book/${_id}/review`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
               cargarComentarios(id);
            }
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
        }
    };

    return {
        cargarComentarios,
        agregarComentario,
    };
};

export default useComentarios;