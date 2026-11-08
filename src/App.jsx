import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'

import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import HistoryPage from './pages/HistoryPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peta" element={<MapPage />} />
        <Route path="/riwayat" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App