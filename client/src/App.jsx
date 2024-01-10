// App.jsx
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './css/custom-scrollbar.css';
import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './pages/Home';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import SettingsInfo from './pages/SettingsInfo';
import SettingsPassword from './pages/SettingsPassword';
//import Settings from './pages/Settings';
import Archive from './pages/Archive';
import Homepage from './pages/Homepage';

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='boards/*' element={<Home />} />
            <Route path='boards/:boardId' element={<Board />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='settings' element={<Settings />} />
            <Route path='settings/info' element={<SettingsInfo />} />
  <Route path='settings/password' element={<SettingsPassword />} />
  <Route path='archive' element={<Archive />} />
  <Route path='homepage' element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

