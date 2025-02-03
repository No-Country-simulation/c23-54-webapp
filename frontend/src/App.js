import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import './Styles/Global.css';
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import { AuthProvider } from "./Context/AuthContext";
import Applications from "./Pages/MisPostulaciones/Applications";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectedUser from "./RouteProtection/ProtectedUser";
import RedirectIfAuthenticated from "./RouteProtection/RedirectIfAuthenticated ";
import MisOfertas from "./Pages/MisOfertas/MisOfertas";
import CreateJobOfferPage from "./Pages/JobOffer/CreateJobOfferPage";
import ProtectedRecruiter from "./RouteProtection/ProtectedRecruiter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectIfAuthenticated> <LandingPage /> </RedirectIfAuthenticated>,
  },
  {
    path: "/Login",
    element: <RedirectIfAuthenticated> <Login /> </RedirectIfAuthenticated>,
  },
  {
    path: "/Registrarse",
    element: <RedirectIfAuthenticated> <Register /></RedirectIfAuthenticated>,
  },
  {
    path: "/Home",
    element: <ProtectedUser> <Home /> </ProtectedUser>,
  },
  {
    path: '/Postulaciones',
    element:  <Applications/>
  },  
  {
    path: '/MisOfertas',
    element: <ProtectedRecruiter><MisOfertas/></ProtectedRecruiter> 
  },
  {
    path: '/crear/oferta_trabajo',
    element: <ProtectedRecruiter><CreateJobOfferPage /></ProtectedRecruiter>
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
