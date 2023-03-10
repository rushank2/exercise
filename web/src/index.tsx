import React from 'react';
import ReactDOM from 'react-dom';
import { RepoList } from './components/RepoList';
import { reportWebVitals } from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RepoDetails } from './components/RepoDetails';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RepoList />,
  },
  {
    path: 'repo-details/:repoId',
    element: <RepoDetails />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
