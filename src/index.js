import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Wrapper from "./Wrapper";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>,
  rootElement
);
