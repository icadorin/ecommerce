import axios from "axios";

const eccomerceFetch = axios.create({
  baseURL: '/api/product',
});

export default eccomerceFetch;
