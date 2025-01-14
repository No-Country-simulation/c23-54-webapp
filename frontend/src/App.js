import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import './Styles/Global.css';
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>, 
  },
  {
    path: "/Registrarse",
    element: <Register/>,	
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
