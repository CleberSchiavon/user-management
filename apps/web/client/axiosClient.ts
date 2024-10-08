import axios from 'axios'


export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
