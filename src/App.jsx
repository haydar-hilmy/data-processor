import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layouts/Home";
import './css/main.css'
import Dataset from "./components/Fragments/Dataset";
import DatasetPreview from "./components/Layouts/DatasetPreview";
import DataGet from "./func/DataGet";

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
    }
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App

// BUTTON REMMBER DIBERI PARAMETER BERDASARKAN ID DATASETNYA
