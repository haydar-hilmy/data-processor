import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/main.css';
import Home from "./components/Layouts/Home";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
], {
  future: {
    v7_startTransition: true, // Opt-in to the future feature early
  },
});

function App() {
  return (
    <RouterProvider router={myRouter} />
  );
}

export default App;
