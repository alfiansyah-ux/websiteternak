import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login, error } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData.email, formData.password)

    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    }
  }

  const handleDemoLogin = async (role) => {
    const demoCredentials = {
      ADMIN: { email: 'admin@example.com', password: 'Password123!' },
      FARMER: { email: 'farmer@example.com', password: 'Farmer123!' },
      CUSTOMER: { email: 'customer@example.com', password: 'Customer123!' },
    }

    const credentials = demoCredentials[role]
    if (!credentials) return

    setLoading(true)
    const result = await login(credentials.email, credentials.password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Masuk ke Abu Farm
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Akses dashboard peternakan, pesanan, dan marketplace Anda.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Kata sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Masukkan kata sandi"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Masuk...
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </div>

          <div className="space-y-3 pt-3">
            <p className="text-sm text-slate-600 text-center">Login demo:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="py-2 px-3 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('FARMER')}
                className="py-2 px-3 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                Peternak
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('CUSTOMER')}
                className="py-2 px-3 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                Pelanggan
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login