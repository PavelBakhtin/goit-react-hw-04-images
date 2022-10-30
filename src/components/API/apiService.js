import axios from 'axios';
const API_KEY = '17553601-11a77715f3e073a989ba7d24f';
export const apiService = async (query, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        per_page: 12,
        page: page,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
