import React, { useState } from 'react'
import { chatbotAPI } from '../utils/api'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Saya dapat membantu kesehatan ternak, pesanan marketplace, dan wawasan dashboard. Apa yang ingin Anda diskusikan?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { from: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await chatbotAPI.chat(input.trim())
      setMessages((prev) => [...prev, { from: 'bot', text: response.data.reply }])
    } catch (err) {
      setError(err.response?.data?.message || 'Tidak dapat terhubung ke chatbot sekarang')
      setMessages((prev) => [...prev, { from: 'bot', text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }])
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
              <h1 className="text-2xl font-semibold text-gray-900">Asisten AI</h1>
              <p className="mt-1 text-gray-600">Dapatkan rekomendasi cepat untuk farm, marketplace, atau wawasan dashboard Anda.</p>
            </div>
          </div>

          {error && <div className="mb-4 rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <main className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Chat dengan asisten peternakan Anda</h2>
                  <p className="mt-1 text-sm text-gray-500">Tanyakan tentang pesanan, tren marketplace, dan analitik produksi.</p>
                </div>
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div key={idx} className={`rounded-3xl p-4 ${message.from === 'bot' ? 'bg-gray-100 self-start' : 'bg-blue-600 text-white self-end'}`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanyakan ke asisten AI..."
                    className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                  >
                    {loading ? 'Mengirim...' : 'Kirim'}
                  </button>
                </form>
              </div>
            </main>

            <aside className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-gray-900">Tips Chat</h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="rounded-2xl bg-gray-50 p-4">Tanyakan status pesanan dan pelacakan.</li>
                  <li className="rounded-2xl bg-gray-50 p-4">Minta saran produksi untuk susu, daging, atau hasil ternak.</li>
                  <li className="rounded-2xl bg-gray-50 p-4">Dapatkan panduan marketplace untuk pembelian dan penetapan harga.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
