import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import Torta from "./pages/torta/Torta.tsx"
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<App />}
      />
      <Route
        path='/Login'
        element={<Login />}
      />
      <Route
        path='/Torta'
        element={<Torta/>} />
        
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>,
);
