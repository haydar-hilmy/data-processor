import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import DatasetTab from "./Components/Pages/DatasetTab";

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
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
