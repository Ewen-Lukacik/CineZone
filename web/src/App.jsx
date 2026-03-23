import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
                {/* <Admin /> */}
            </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App