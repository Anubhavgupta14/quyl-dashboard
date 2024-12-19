import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoute from "./routes/route"

const router = createBrowserRouter([
  {
    path: "*",
    element: <UserRoute />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App