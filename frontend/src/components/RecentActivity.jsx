import React from 'react'

const RecentActivity = ({ userRole }) => {
  const getActivityData = () => {
    if (userRole === 'ADMIN') {
      return [
        {
          id: 1,
          type: 'user_registration',
          title: 'Pengguna baru terdaftar',
          description: 'John Farmer bergabung dengan platform',
          time: '2 menit lalu',
          icon: (
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          )
        },
        {
          id: 2,
          type: 'product_added',
          title: 'Produk baru ditambahkan',
          description: 'Susu segar ditambahkan ke pasar',
          time: '15 menit lalu',
          icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )
        },
        {
          id: 3,
          type: 'order_completed',
          title: 'Pesanan selesai',
          description: 'Pesanan #1234 berhasil dikirim',
          time: '1 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 4,
          type: 'system_update',
          title: 'Pemeliharaan sistem',
          description: 'Optimasi database selesai',
          time: '3 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        }
      ]
    }

    if (userRole === 'FARMER') {
      return [
        {
          id: 1,
          type: 'livestock_added',
          title: 'Ternak baru ditambahkan',
          description: 'Ditambahkan 5 sapi perah ke inventaris',
          time: '30 menit lalu',
          icon: (
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )
        },
        {
          id: 2,
          type: 'production_update',
          title: 'Pembaruan produksi',
          description: 'Produksi susu harian: 1.250 liter',
          time: '2 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )
        },
        {
          id: 3,
          type: 'health_check',
          title: 'Pemeriksaan kesehatan selesai',
          description: 'Pemeriksaan dokter hewan untuk kawanan sapi',
          time: '4 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 4,
          type: 'expense_recorded',
          title: 'Pengeluaran tercatat',
          description: 'Pembelian pakan: $450',
          time: '6 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    }

    if (userRole === 'CUSTOMER') {
      return [
        {
          id: 1,
          type: 'order_placed',
          title: 'Pesanan dibuat',
          description: 'Memesan susu segar dari Green Valley Farm',
          time: '1 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )
        },
        {
          id: 2,
          type: 'order_delivered',
          title: 'Pesanan terkirim',
          description: 'Pesanan #5678 berhasil dikirim',
          time: '3 jam lalu',
          icon: (
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 3,
          type: 'review_submitted',
          title: 'Ulasan terkirim',
          description: 'Memberikan ulasan 5 bintang untuk Sunny Side Farm',
          time: '1 hari lalu',
          icon: (
            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )
        },
        {
          id: 4,
          type: 'farm_followed',
          title: 'Peternakan diikuti',
          description: 'Mulai mengikuti Meadow Fresh Dairy',
          time: '2 hari lalu',
          icon: (
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )
        }
      ]
    }

    return [
      {
        id: 1,
        type: 'system',
        title: 'Selamat datang di platform',
        description: 'Akun Anda telah diaktifkan',
        time: 'Baru saja',
        icon: (
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ]
  }

  const activities = getActivityData()

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Aktivitas Terbaru
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity, activityIdx) => (
            <div key={activity.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full px-4 py-2 text-center text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
            Lihat semua aktivitas
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecentActivity