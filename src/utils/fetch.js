const API_URL = import.meta.env.VITE_API_URL;
export const fetchData = async (endpoint, options = {}) => {
  try {
    const res = await fetch(API_URL + endpoint, {
      ...options,
    });
    if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
