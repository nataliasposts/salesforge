import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SequenceProvider } from "./store/SequenceContext.tsx";
import RootRouter from "./router/RootRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SequenceProvider>
      <BrowserRouter>
        <App>
          <RootRouter />
        </App>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
        />
      </BrowserRouter>
    </SequenceProvider>
  </StrictMode>
);
