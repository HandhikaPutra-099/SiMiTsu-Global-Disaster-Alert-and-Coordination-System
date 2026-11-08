import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-3 text-slate-600">
        Halaman tidak ditemukan.
      </p>
      <Link to="/" className="mt-6 text-cyan-600">
        Kembali ke Beranda
      </Link>
    </main>
  )
}

export default NotFoundPage