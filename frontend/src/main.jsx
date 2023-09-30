import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

import store from './store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage /> }/>
      <Route path='/register' element={<RegisterPage /> }/>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage /> }/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
