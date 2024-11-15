import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import DatasetTab from "./Components/Pages/DatasetTab";
import { useEffect } from "react";
import SettingsTab from "./Components/Pages/Settings";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dataset",
    element: <DatasetTab />
  },
  {
    path: "/dataset/:iddataset",
    element: <DatasetTab />
  },
  {
    path: "/settings",
    element: <SettingsTab />
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

export default App;
