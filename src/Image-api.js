import axios from "axios";

const API_KEY = "35g1NA-GoSKeP7Oco6_nVMROnh964Sx5yrq621mwF8M";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchImages = async (request, currentPage) => {
  const searchImages = new URLSearchParams({
    query: request,
    content_filter: "high",
    orientation: "landscape",
    page: currentPage,
    per_page: 15,
  });

  const response = await axios.get(`search/photos?${searchImages}`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  return {
    results: response.data.results,
    total: response.data.total,
  };
};
