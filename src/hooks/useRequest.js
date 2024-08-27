import { useCallback, useState } from "react";
import { fetchData } from "../utils/fetch";

export const useRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (endpoint, options = {}) => {
    try {
      const { data } = await fetchData(endpoint, options);
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, setData, sendRequest };
};
