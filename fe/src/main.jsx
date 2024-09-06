import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter(
  [
    {path : '/signUp',
    element: <SignUp />
    },
    {
    path: '/login',
    element: <Login />
    },
    {
      path: '/',
      element: <App />
    }
  ]
);

createRoot(document.getElementById('root')).render(
  

  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

