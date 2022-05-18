import axios from 'axios';
const strapiAPIKey = process.env.STRAPI_API_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${strapiAPIKey}`;

export default axios;
