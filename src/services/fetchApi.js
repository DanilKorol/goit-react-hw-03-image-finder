import axios from 'axios';

const API_KEY = '33913082-ade5365176eff0ab7925d756c';

export const fetchApi = async (query, page) => {
  const request = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(request);
  return response.data;
};
