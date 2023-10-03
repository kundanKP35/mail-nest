import React from 'react';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
    </>
  )
}

export default App