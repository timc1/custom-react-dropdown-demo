import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

import Demo from "./demo";

function App() {
  return <Demo />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
