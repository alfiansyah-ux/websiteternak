import React from 'react'

const Navbar = ({ user, onLogout }) => {
  const getRoleBadge = () => {
    if (user?.role === 'ADMIN') return { text: 'Administrator', color: 'bg-red-100 text-red-800' }
    if (user?.role === 'FARMER') return { text: 'Peternak', color: 'bg-green-100 text-green-800' }
    if (user?.role === 'CUSTOMER') return { text: 'Pelanggan', color: 'bg-blue-100 text-blue-800' }
    return { text: 'Pengguna', color: 'bg-gray-100 text-gray-800' }
  }

  const roleBadge = getRoleBadge()

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-gray-900">Abu Farm</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-72">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari di Abu Farm"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <span className="sr-only">Lihat notifikasi</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.618 4.618A9.955 9.955 0 0112 2c5.519 0 10 4.481 10 10 0 5.519-4.481 10-10 10-2.618 0-5.019-.977-6.927-2.618L2 22l4.382-1.382A9.957 9.957 0 012 12c0-2.618.977-5.019 2.618-6.927z" />
              </svg>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}>
                {roleBadge.text}
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar