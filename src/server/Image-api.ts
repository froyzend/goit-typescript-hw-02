import axios from "axios";
import { FetchImagesFunction } from "../server/Image-api.types";
const API_KEY = "35g1NA-GoSKeP7Oco6_nVMROnh964Sx5yrq621mwF8M";
const BASE_URL = "https://api.unsplash.com/";

export const fetchImages: FetchImagesFunction = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: 12,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export default fetchImages;
