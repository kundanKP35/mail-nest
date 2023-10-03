import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import PrivateRoute from './components/private_route.jsx';
import './index.css';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Home from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import Profile from './pages/profile.jsx';
import RegisterPage from './pages/register.jsx';
import MailPage from './pages/mail.jsx';
import store from './store.js';

import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<MailPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
    </React.StrictMode>
  </Provider>
)
