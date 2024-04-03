import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import { Layout } from "./components/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ThemeProvider } from "./components/ThemeProvider";

import { Auth } from "./features/auth/Auth";
import { Books } from "./pages/Books";

import "./index.css";
import { BookPage } from "./pages/BookPage";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Books />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books/:id",
        element: <BookPage />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <Auth>
            <RouterProvider router={router} />
          </Auth>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
