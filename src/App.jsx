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
], {
  future: {
    v7_startTransition: true,
  },
});

const App = () => {
  return (
    <>
      <RouterProvider router={myRouter} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
