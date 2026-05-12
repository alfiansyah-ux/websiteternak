import React from 'react'
import { useAuth } from '../hooks/AuthContext'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StatsCards from '../components/StatsCards'
import ChartsSection from '../components/ChartsSection'
import RecentActivity from '../components/RecentActivity'

const Dashboard = () => {
  const { user, logout, isAdmin, isFarmer, isCustomer } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Navbar */}
        <Navbar user={user} onLogout={logout} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-5 lg:px-6 xl:px-8 py-8 max-w-none mx-auto w-full">
            {/* Header */}
            <div className="mb-12 max-w-5xl w-full">
              <h1 className="text-3xl font-semibold text-slate-900">Selamat datang kembali, {user?.name}!</h1>
              <p className="mt-3 text-base text-slate-600">Ringkasan peternakan dan metrik penting Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              <Link
                to="/marketplace"
                className="group bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pasar</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">Telusuri produk</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/orders"
                className="group bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-green-300 transition duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-2xl">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pesanan</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">Lihat pembelian</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/chatbot"
                className="group bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-purple-300 transition duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.62 9.62 0 01-4-.83L3 20l1.21-3.63A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Chatbot AI</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">Dapatkan wawasan</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Stats & Insights */}
            <div className="space-y-10">
              <StatsCards userRole={user?.role} />
              <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                <ChartsSection userRole={user?.role} />
                <RecentActivity userRole={user?.role} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard