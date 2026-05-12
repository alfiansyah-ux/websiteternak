import React, { useEffect, useMemo, useState } from 'react'
import { livestockAPI } from '../utils/api'
import { useAuth } from '../hooks/AuthContext'

const LIVESTOCK_TYPES = ['COW', 'CHICKEN', 'GOAT']

const defaultFormState = {
  type: 'COW',
  age: 0,
  weight: 0,
  healthCondition: 'Sehat',
  vaccinationStatus: 'Tervaksin',
  entryDate: new Date().toISOString().slice(0, 10),
}

const Livestock = () => {
  const { user } = useAuth()
  const [livestockList, setLivestockList] = useState([])
  const [formState, setFormState] = useState(defaultFormState)
  const [selectedLivestock, setSelectedLivestock] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const fetchLivestock = async () => {
    setLoading(true)
    try {
      const response = await livestockAPI.list()
      setLivestockList(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat memuat data ternak')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLivestock()
  }, [])

  const resetForm = () => {
    setFormState(defaultFormState)
    setEditingId(null)
    setSelectedLivestock(null)
    setMessage(null)
    setError(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (editingId) {
        await livestockAPI.update(editingId, formState)
        setMessage('Data ternak berhasil diperbarui')
      } else {
        await livestockAPI.create(formState)
        setMessage('Ternak berhasil ditambahkan')
      }
      resetForm()
      fetchLivestock()
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat menyimpan data ternak')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (livestock) => {
    setEditingId(livestock.id)
    setSelectedLivestock(livestock)
    setFormState({
      type: livestock.type,
      age: livestock.age,
      weight: livestock.weight,
      healthCondition: livestock.healthCondition,
      vaccinationStatus: livestock.vaccinationStatus,
      entryDate: livestock.entryDate.slice(0, 10),
    })
    setMessage(null)
    setError(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data ternak ini?')) {
      return
    }
    setLoading(true)
    setError(null)
    try {
      await livestockAPI.remove(id)
      setMessage('Data ternak berhasil dihapus')
      if (selectedLivestock?.id === id) {
        resetForm()
      }
      fetchLivestock()
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat menghapus data ternak')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (livestock) => {
    setSelectedLivestock(livestock)
    setEditingId(null)
    setMessage(null)
    setError(null)
  }

  const typeLabel = useMemo(() => ({
    COW: 'Sapi',
    CHICKEN: 'Ayam',
    GOAT: 'Kambing',
  }), [])

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Manajemen Ternak</h1>
              <p className="mt-1 text-sm text-gray-600">
                Kelola ternak Anda dengan menambah, mengubah, menghapus, dan melihat detail dengan cepat.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                {user?.role === 'FARMER' ? 'Dasbor Peternak' : 'Akses Admin'}
              </span>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <section className="space-y-6">
              <div className="bg-white shadow rounded-3xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Ternak Saya</h2>
                    <p className="text-sm text-gray-500">Semua catatan untuk inventaris ternak Anda.</p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    Tambah Ternak Baru
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Jenis</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Usia</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Berat</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Kesehatan</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Vaksin</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Masuk</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                            Memuat data ternak...
                          </td>
                        </tr>
                      ) : livestockList.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                            Belum ada data ternak.
                          </td>
                        </tr>
                      ) : (
                        livestockList.map((livestock) => (
                          <tr key={livestock.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">{typeLabel[livestock.type]}</td>
                            <td className="px-4 py-3 text-gray-900">{livestock.age} bln</td>
                            <td className="px-4 py-3 text-gray-900">{livestock.weight.toFixed(1)} kg</td>
                            <td className="px-4 py-3 text-gray-900">{livestock.healthCondition}</td>
                            <td className="px-4 py-3 text-gray-900">{livestock.vaccinationStatus}</td>
                            <td className="px-4 py-3 text-gray-500">{new Date(livestock.entryDate).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => handleSelect(livestock)}
                                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                Lihat
                              </button>
                              <button
                                onClick={() => handleEdit(livestock)}
                                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                              >
                                Ubah
                              </button>
                              <button
                                onClick={() => handleDelete(livestock.id)}
                                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {message && (
                <div className="rounded-3xl bg-green-50 p-4 text-sm text-green-700">{message}</div>
              )}
              {error && (
                <div className="rounded-3xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
              )}
            </section>

            <section className="space-y-6">
              <div className="bg-white shadow rounded-3xl border border-gray-200 p-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{editingId ? 'Ubah Ternak' : 'Tambah Ternak'}</h2>
                    <p className="text-sm text-gray-500">Gunakan formulir ini untuk menyimpan metadata ternak.</p>
                  </div>
                  {editingId && (
                    <button
                      onClick={resetForm}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Batal
                    </button>
                  )}
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-gray-700">
                      Jenis Ternak
                      <select
                        name="type"
                        value={formState.type}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {LIVESTOCK_TYPES.map((type) => (
                          <option key={type} value={type}>{typeLabel[type]}</option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2 text-sm text-gray-700">
                      Usia (bulan)
                      <input
                        type="number"
                        name="age"
                        min="0"
                        value={formState.age}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-gray-700">
                      Berat (kg)
                      <input
                        type="number"
                        step="0.1"
                        name="weight"
                        min="0"
                        value={formState.weight}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-gray-700">
                      Tanggal Masuk
                      <input
                        type="date"
                        name="entryDate"
                        value={formState.entryDate}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-gray-700">
                    Kondisi Kesehatan
                    <input
                      type="text"
                      name="healthCondition"
                      value={formState.healthCondition}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-gray-700">
                    Status Vaksin
                    <input
                      type="text"
                      name="vaccinationStatus"
                      value={formState.vaccinationStatus}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                  >
                    {editingId ? 'Perbarui Data' : 'Simpan Ternak'}
                  </button>
                </form>
              </div>

              <div className="bg-white shadow rounded-3xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Ternak</h2>
                {selectedLivestock ? (
                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="rounded-3xl bg-gray-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-gray-900">{typeLabel[selectedLivestock.type]}</p>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{selectedLivestock.farmer?.name || 'Pemilik'}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{selectedLivestock.healthCondition}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white border border-gray-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Usia</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{selectedLivestock.age} bulan</p>
                      </div>
                      <div className="rounded-3xl bg-white border border-gray-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Berat</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{selectedLivestock.weight.toFixed(1)} kg</p>
                      </div>
                      <div className="rounded-3xl bg-white border border-gray-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Vaksin</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{selectedLivestock.vaccinationStatus}</p>
                      </div>
                      <div className="rounded-3xl bg-white border border-gray-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Tanggal Masuk</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{new Date(selectedLivestock.entryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-gray-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Peternak</p>
                      <p className="mt-2 text-sm text-gray-900">{selectedLivestock.farmer?.name || 'Tidak tersedia'}</p>
                      <p className="text-sm text-gray-500">{selectedLivestock.farmer?.email || ''}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Pilih baris ternak untuk melihat detail di sini.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Livestock
