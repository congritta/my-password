import React, {createContext} from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/inputs.css";
import "./styles/typography.css";
import {BrowserRouter} from "react-router-dom";

import App from "./components/App";
import {IconsCollection} from "./components/Icon";
import mainStore, {MainStore} from "./store/main.ts";

export const MainContext = createContext<MainStore>(mainStore);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IconsCollection />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
