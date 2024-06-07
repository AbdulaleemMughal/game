import theme, { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ColorModeContext.Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
  <div className='app'>
    <main className="content"></main>
  </div>
  </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
