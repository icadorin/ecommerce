import axios from "axios";

const eccomerceFetch = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export default eccomerceFetch;
