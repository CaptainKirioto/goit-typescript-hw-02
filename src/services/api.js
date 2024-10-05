import axios from "axios";

// const API_KEY = import.meta.env.VITE_API_KEY;

const API_KEY = "727gOy69tyeyfXPWewhpw1BCd94fcx4353H_X08pkK4";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

const fetchImages = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      page,
      per_page: 10,
    },
  });
  return response.data;
};

export default fetchImages;
