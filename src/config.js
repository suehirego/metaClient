import axios from 'axios'

export const axiosInstance = axios.create({
      baseURL: "https://meta-inspo.herokuapp.com/api/"
});