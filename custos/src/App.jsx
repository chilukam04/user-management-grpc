import {createBrowserRouter,  RouterProvider } from 'react-router-dom'
import './App.css'
import CallbackPage from './pages/CallbackPage';
import LoginPage from './pages/LoginPage';

function App() {
  const router = createBrowserRouter([


    {
      path: '/callback',
      element: <CallbackPage />,  
    },
    {
      path: '/',
      element: <LoginPage/>,
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
