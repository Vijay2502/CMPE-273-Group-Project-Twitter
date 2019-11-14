import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
