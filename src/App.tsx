import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <main className='flex items-center justify-center '>
        <Outlet />
      </main>
    </>
  )
}

export default App
