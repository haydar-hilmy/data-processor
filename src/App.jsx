import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layouts/Home";
import './css/main.css'

const App = () => {

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App
