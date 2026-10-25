import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [{}],
    },
    {
      element: <Layout />,
      path: "*",
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
