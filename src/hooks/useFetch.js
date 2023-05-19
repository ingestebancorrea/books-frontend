import { useState, useEffect } from 'react';

const useFetch = (url, method, body) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        };

        const response = await fetch(url, options);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        // Manejar errores
      }
    };

    fetchData();
  }, [url, method, body]);

  return data;
};

export default useFetch;