import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layouts/Home";
import './css/main.css'
import Dataset from "./components/Fragments/Dataset";
import DatasetPreview from "./components/Layouts/DatasetPreview";
import RightClickComponent from "./components/Test/Test_RightClick";

const App = () => {

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/data",
      element: <DatasetPreview />
    },
    {
      path: "/test",
      element: <Dataset />
    },
    {
      path: "/test2",
      element: <RightClickComponent />
    }
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App