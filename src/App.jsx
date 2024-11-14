import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
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
