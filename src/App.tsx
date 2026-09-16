import { WalletProvider } from '@/context/WalletContext'
import { ExplorePage } from '@/pages/ExplorePage'
import { LandingPage } from '@/pages/LandingPage'
import { ReferencesPage } from '@/pages/ReferencesPage'
import { SafetyPage } from '@/pages/SafetyPage'
import { WalletPage } from '@/pages/WalletPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<ExplorePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  )
}
