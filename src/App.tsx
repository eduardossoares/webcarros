import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { NewCar } from "./pages/dashboard/new";
import { CarDetail } from "./pages/car";
import { Register } from "./pages/register";

import { Layout } from "./components/Layout";
import { Private } from "./routes/Private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/carro/:id",
        element: <CarDetail />
      },
      {
        path: "/dashboard",
        element: <Private><Dashboard /></Private>
      },
      {
        path: "/dashboard/novo-carro",
        element: <Private><NewCar /></Private>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Register />
  }
]);