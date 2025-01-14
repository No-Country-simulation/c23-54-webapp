import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>, 
  },
  {
    path: "*",
    element: <NotFound/>, 
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
