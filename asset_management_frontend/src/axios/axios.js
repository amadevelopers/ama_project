import axios from 'axios'

const port = 8000
const axiosInstance = axios.create({
    baseURL : `http://127.0.0.1:${port}/inventory`
    // baseURL : 'http://localhost:9000/inventory'
})

export default axiosInstance