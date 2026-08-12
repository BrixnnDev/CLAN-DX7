import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToHash from './components/ScrollToHash'
import CleanUrl from './components/CleanUrl'
import Home from './pages/Home'
import ContactoPage from './pages/Contacto'
import Reglas from './pages/Reglas'
import Miembros from './pages/Miembros'
import Nosotros from './pages/Nosotros'
import Preguntas from './pages/Preguntas'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <CleanUrl />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/reglas" element={<Reglas />} />
            <Route path="/miembros" element={<Miembros />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
