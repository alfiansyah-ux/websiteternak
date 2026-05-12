import React from 'react'

const ChartsSection = ({ userRole }) => {
  const getChartData = () => {
    if (userRole === 'ADMIN') {
      return {
        title: 'Analitik Platform',
        charts: [
          {
            title: 'Pertumbuhan Pengguna',
            description: 'Pendaftaran pengguna setiap bulan',
            type: 'line'
          },
          {
            title: 'Tren Pendapatan',
            description: 'Pendapatan bulanan dari waktu ke waktu',
            type: 'bar'
          }
        ]
      }
    }

    if (userRole === 'FARMER') {
      return {
        title: 'Analitik Peternakan',
        charts: [
          {
            title: 'Tren Produksi',
            description: 'Produksi susu dan ternak dari waktu ke waktu',
            type: 'line'
          },
          {
            title: 'Kesehatan Ternak',
            description: 'Metrik kesehatan per kategori',
            type: 'pie'
          }
        ]
      }
    }

    if (userRole === 'CUSTOMER') {
      return {
        title: 'Analitik Pembelian',
        charts: [
          {
            title: 'Tren Pengeluaran',
            description: 'Pola pengeluaran bulanan',
            type: 'line'
          },
          {
            title: 'Kategori Produk',
            description: 'Pembelian berdasarkan kategori',
            type: 'bar'
          }
        ]
      }
    }

    return {
      title: 'Analitik',
      charts: [
        {
          title: 'Ikhtisar Data',
          description: 'Visualisasi data umum',
          type: 'line'
        }
      ]
    }
  }

  const chartData = getChartData()

  const renderChart = (chart) => {
    return (
      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500">
            {chart.type === 'line' && '📈 Grafik Garis'}
            {chart.type === 'bar' && '📊 Grafik Batang'}
            {chart.type === 'pie' && '🥧 Grafik Pai'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Integrasi pustaka grafik akan menyusul
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-slate-900 mb-4">{chartData.title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData.charts.map((chart, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{chart.title}</h3>
                  <p className="text-sm text-slate-500">{chart.description}</p>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  30 hari terakhir
                </div>
              </div>
              {renderChart(chart)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartsSection