import { useState } from 'react';
import { useSelector } from 'react-redux';

const useComentarios = ( ) => {

    const [comentarios, setComentarios] = useState([]);
    
    const { displayName, photoURL } = useSelector(state => state.auth);

    const cargarComentarios = async (id) => {
        try {
            // Realizar una solicitud para obtener los comentarios del servidor
            const respuesta = await fetch(`http://localhost:3002/api/v1/book/${id}`);
            const comentarios = await respuesta.json();

            // Actualizar el estado de los comentarios
            setComentarios(comentarios.reseñas);
        } catch (error) {
            console.error('Error al cargar los comentarios:', error);
        }
    };

    const agregarComentario = async (_id, data) => {
        try {
            const requestBody = {
                username: displayName,
                comentario: data,
                fecha: new Date(),
                image_url: photoURL
            };

            const response = await fetch(`http://localhost:3002/api/v1/book/${_id}/review`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el comentario');
            }
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
        }
    };

    return {
        comentarios,
        cargarComentarios,
        agregarComentario,
    };
};

export default useComentarios;