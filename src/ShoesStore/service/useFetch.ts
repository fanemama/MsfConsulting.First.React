import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMountedRef.current) setData(json);
        } else {
          throw response;
        }
      } catch (e: any) {
        if (isMountedRef.current) setError(e);
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMountedRef.current = false;
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
