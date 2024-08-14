import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemPages from './pages/ItemPages';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/items" element={
            <ProtectedRoute>
              <ItemPages />
            </ProtectedRoute>} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}