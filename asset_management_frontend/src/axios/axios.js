import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : 'http://127.0.0.1:9000/inventory'
    // baseURL : 'http://localhost:9000/inventory'

})

export default axiosInstance