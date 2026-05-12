import React, { useEffect, useState } from 'react'
import { productAPI, orderAPI } from '../utils/api'

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await productAPI.list()
      setProducts(response.data)
      const initialQuantities = response.data.reduce((acc, product) => {
        acc[product.id] = 1
        return acc
      }, {})
      setQuantities(initialQuantities)
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat memuat produk marketplace')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Number(value)),
    }))
  }

  const handleOrder = async (product) => {
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const quantity = quantities[product.id] || 1
      await orderAPI.create({ items: [{ productId: product.id, quantity }] })
      setMessage(`Pesanan berhasil dibuat untuk ${quantity} x ${product.name}.`)
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat memesan sekarang')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Pasar</h1>
              <p className="mt-1 text-gray-600">Telusuri produk peternakan yang tersedia dan pesan langsung dari marketplace.</p>
            </div>
          </div>

          {message && <div className="mb-4 rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
          {error && <div className="mb-4 rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Produk Tersedia</h2>
                  <p className="mt-1 text-sm text-gray-500">Pilih jumlah dan pesan produk segar dari peternak tepercaya.</p>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-4 py-3">Produk</th>
                        <th className="px-4 py-3">Jenis</th>
                        <th className="px-4 py-3">Peternak</th>
                        <th className="px-4 py-3">Harga</th>
                        <th className="px-4 py-3">Stok</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">Memuat produk...</td>
                        </tr>
                      ) : products.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">Tidak ada produk tersedia di marketplace.</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                            <td className="px-4 py-4 text-gray-700">{product.type}</td>
                            <td className="px-4 py-4 text-gray-700">{product.farmer?.name || 'Peternak'}</td>
                            <td className="px-4 py-4 text-gray-900">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-4 text-gray-700">{product.stock}</td>
                            <td className="px-4 py-4">
                              <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantities[product.id] ?? 1}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                className="w-20 rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button
                                disabled={product.stock === 0 || loading}
                                onClick={() => handleOrder(product)}
                                className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                              >
                                Pesan
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Ringkasan Marketplace</h3>
                <p className="text-sm text-gray-600">Ringkasan cepat ketersediaan produk dan aktivitas pemesanan.</p>
                <div className="grid gap-3">
                  <div className="rounded-3xl bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">Pengiriman Cepat</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Pesan dalam hitungan menit</p>
                  </div>
                  <div className="rounded-3xl bg-green-50 p-4">
                    <p className="text-sm text-green-700">Stok Segar</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Produk peternakan lokal</p>
                  </div>
                  <div className="rounded-3xl bg-yellow-50 p-4">
                    <p className="text-sm text-yellow-700">Pembayaran Aman</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Alur pemesanan sederhana</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marketplace
