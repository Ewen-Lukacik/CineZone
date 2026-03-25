import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'
import Register from './pages/Register'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ROUTES PROTEGEES */}
        <Route path="/profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
                <Admin />
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App