import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../App";
import DashboardPage from "../../pages/private/DashboardPage";
import AuthCallback from "../../pages/public/AuthCallback";
import { HomePage } from "../../pages/public/HomePage";
import LoginPage from "../../pages/public/LoginPage";
import MovieDetailPage from "../../pages/public/MovieDetailPage";
import RegisterPage from "../../pages/public/RegisterPage";
import AuthLayout from "../layout/AuthLayout";
import DefaultLayout from "../layout/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/movies/:id",
            element: <MovieDetailPage />,
          },
          {
            element: <DashboardPage />,
            path: "/dashboard",
          },
          {
            element: <AuthCallback />,
            path: "/auth/callback",
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
