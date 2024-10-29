import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layouts/Home";
import './css/main.css'
import Dataset from "./components/Fragments/Dataset";

const App = () => {

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/test",
      element: <Dataset />,
    }
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App
