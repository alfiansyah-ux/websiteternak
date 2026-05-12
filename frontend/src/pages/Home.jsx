import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const Home = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-slate-900">Abu Farm</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-600">Halo, {user?.name}</span>
                  <Link
                    to="/dashboard"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Dasbor
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-green-600 to-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Abu Farm</span>
            <span className="block text-sky-600">Platform Ternak Profesional</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Kelola peternakan dengan lebih mudah melalui dashboard, monitoring kesehatan ternak,
            dan marketplace terintegrasi untuk jual beli produk segar.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 md:py-4 md:text-lg md:px-10"
              >
                {isAuthenticated ? 'Buka Dasbor' : 'Mulai Sekarang'}
              </Link>
            </div>
            {!isAuthenticated && (
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10"
                >
                  Masuk
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Farmers */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900">Untuk Peternak</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Kelola ternak dengan monitoring kesehatan, pelacakan produksi, dan manajemen finansial.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900">Untuk Pembeli</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Temukan produk segar langsung dari peternak dengan transparansi kualitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-900">Wawasan AI</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Dapatkan analitik prediktif, peringatan kesehatan, dan rekomendasi optimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Siap membawa peternakan Anda ke level selanjutnya?
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-blue-100">
                Bergabung dengan peternak dan pembeli yang sudah merasakan kemudahan manajemen dan penjualan.
                Daftar sekarang untuk mulai menggunakan Abu Farm.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="sm:flex">
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Mulai Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home