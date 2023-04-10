import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Editor from "./editor/Editor";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/profile/:uuid", element: <Editor /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
