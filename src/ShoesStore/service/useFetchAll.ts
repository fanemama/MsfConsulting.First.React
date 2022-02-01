import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetchAll = <T>(urls: string[]) => {
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export default useFetchAll;
