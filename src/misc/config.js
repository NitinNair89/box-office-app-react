const API_BASE_URL = 'https://api.tvmaze.com';

export default async function apiGet(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`)
    // convert response to JSON
    .then(response => response.json());
  return response;
}
