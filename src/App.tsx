import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./components/shared/GlobalStyle";
import { darkTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <div></div>
    </ThemeProvider>
  );
}

export default App;
