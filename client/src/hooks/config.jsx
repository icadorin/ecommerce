import axios from "axios";

const eccomerceFetch = axios.create({
  baseURL: process.env.REACT_APP_API
});

// export const useApi = () => ({
//   validateToken: async (token: string) => {

//   },
//   singin: async (email: string, password: string) => {
//     const response = await api.post
//   },
//   logout: async () => {

//   }
// })

export default eccomerceFetch;
