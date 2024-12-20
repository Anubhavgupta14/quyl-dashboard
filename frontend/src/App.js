import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoute from "./routes/route"
import { Toaster, toast } from 'sonner'

const router = createBrowserRouter([
  {
    path: "*",
    element: <UserRoute />,
  },
]);

const App = () => {
  return (
    <>
    <Toaster/>
    <RouterProvider router={router} />
    </>
  )
}

export default App