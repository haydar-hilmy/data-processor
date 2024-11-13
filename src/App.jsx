import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./components/Layouts/Home";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dataset/:idDataset",
    element: "as"
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
