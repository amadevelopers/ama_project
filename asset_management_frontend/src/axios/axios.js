import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL : 'http://127.0.0.1:8000/inventory'
    baseURL : 'http://localhost:8000/inventory'

})

export default axiosInstance