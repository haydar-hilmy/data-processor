import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layouts/Home";
import './css/main.css'
import Dataset from "./components/Fragments/Dataset";
import DatasetPreview from "./components/Layouts/DatasetPreview";
import RightClickComponent from "./components/Test/Test_RightClick";
import getColumnNamesFromCSV from "./func/tensorflow/getColNameDataset";
import Test_getCol from "./components/Test/Test_getCol";

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
    },
    {
      path: "/getcol",
      element: <Test_getCol />
    }
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App