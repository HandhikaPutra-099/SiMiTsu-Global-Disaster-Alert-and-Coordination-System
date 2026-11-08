import { Link } from 'react-router-dom'

function Navbar() {
  const menus = [
    { name: 'Beranda', path: '/' },
    { name: 'Penyebab', path: '/#penyebab' },
    { name: 'Simulasi', path: '/#simulasi' },
    { name: 'Peta', path: '/peta' },
    { name: 'Riwayat', path: '/riwayat' },
    { name: 'Mitigasi', path: '/#mitigasi' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-cyan-700">
          SiMiTsu
        </Link>

        <div className="flex flex-wrap gap-5">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              className="text-sm font-medium text-slate-600 hover:text-cyan-600"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar