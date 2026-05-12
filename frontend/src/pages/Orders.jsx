import React, { useEffect, useState } from 'react'
import { orderAPI } from '../utils/api'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await orderAPI.list()
      setOrders(response.data)
      if (response.data.length > 0) {
        setSelectedOrder(response.data[0])
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat memuat pesanan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Pesanan</h1>
              <p className="mt-1 text-gray-600">Tinjau riwayat pembelian dan lacak detail pesanan di satu tempat.</p>
            </div>
          </div>

          {error && <div className="mb-4 rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <section className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Riwayat Pesanan</h2>
                  <p className="mt-1 text-sm text-gray-500">Pesanan terbaru ditampilkan terlebih dahulu.</p>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-4 py-3">Pesanan</th>
                        <th className="px-4 py-3">Jumlah</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">Memuat pesanan...</td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">Belum ada pesanan.</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr
                            key={order.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedOrder?.id === order.id ? 'bg-blue-50' : ''}`}
                            onClick={() => setSelectedOrder(order)}
                          >
                            <td className="px-4 py-4 font-medium text-gray-900">#{order.id}</td>
                            <td className="px-4 py-4 text-gray-900">${order.totalAmount.toFixed(2)}</td>
                            <td className="px-4 py-4 text-gray-700">{order.status}</td>
                            <td className="px-4 py-4 text-gray-700">{order.orderItems.length}</td>
                            <td className="px-4 py-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Detail Pesanan</h2>
                </div>
                {selectedOrder ? (
                  <div className="space-y-5 text-sm text-gray-700">
                    <div className="rounded-3xl bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">ID Pesanan</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">#{selectedOrder.id}</p>
                    </div>
                    <div className="rounded-3xl bg-white border border-gray-200 p-4 space-y-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Items</p>
                      {selectedOrder.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-3">
                          <div>
                              <p className="font-medium text-gray-900">{item.product?.name || 'Produk'}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-3xl bg-white border border-gray-200 p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Total Harga</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Pilih pesanan untuk melihat detail.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
