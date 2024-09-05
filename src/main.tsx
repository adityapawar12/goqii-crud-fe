import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import ErrorPage from "./error-page";
import RootLayout from "./routes/root-layout";

import UsersPage from "./routes/users/users-page";
import UsersCreatePage from "./routes/users/create/users-create-page";
import UsersUpdatePage from "./routes/users/update/users-update-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <UsersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "users/create",
        element: <UsersCreatePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "users/update/:id",
        element: <UsersUpdatePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
