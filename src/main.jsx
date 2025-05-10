import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router}>
          <App />
          <ToastContainer />
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
