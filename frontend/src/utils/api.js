import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/users/profile'),
}

export const livestockAPI = {
  list: () => api.get('/livestock'),
  details: (id) => api.get(`/livestock/${id}`),
  create: (livestockData) => api.post('/livestock', livestockData),
  update: (id, livestockData) => api.put(`/livestock/${id}`, livestockData),
  remove: (id) => api.delete(`/livestock/${id}`),
}

export const productAPI = {
  list: () => api.get('/products'),
  details: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  remove: (id) => api.delete(`/products/${id}`),
}

export const orderAPI = {
  list: () => api.get('/orders'),
  details: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
}

export const chatbotAPI = {
  chat: (message) => api.post('/chatbot', { message }),
}

export default api