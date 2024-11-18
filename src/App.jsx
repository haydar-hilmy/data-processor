import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import DatasetTab from "./Components/Pages/DatasetTab";
import { useEffect } from "react";
import SettingsTab from "./Components/Pages/Settings";
import MainLayout from "./Components/Layouts/MainLayout";
import DatasetTabDetail from "./Components/Pages/DatasetTabDetail";

// const myRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />
//   },
//   {
//     path: "/dataset",
//     element: <DatasetTab />
//   },
//   {
//     path: "/dataset/:iddataset",
//     element: <DatasetTab />
//   },
//   {
//     path: "/settings",
//     element: <SettingsTab />
//   }
// ]);

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        path: '/dashboard',
        element: <Dashboard />,
        title: "Overview Dashboard"
      },
      { 
        path: '/dataset',
        element: <DatasetTab />,
        title: "Manage Your Dataset"
      },
      {
        path: '/dataset/:iddataset',
        element: <DatasetTabDetail />,
        title: "Dataset Records & Insight"
      },
      {
        path: '/settings',
        element: <SettingsTab />,
        title: "Application Settings"
      }
      // Tambahkan halaman lainnya yang menggunakan MainLayout
    ],
  }
]);

const App = () => {

  useEffect(() => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
    };
}, []);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export { App, myRouter };
