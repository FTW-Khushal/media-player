import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AlbumList from "./components/layout/AlbumList";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#000000"
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AlbumList />

    </ThemeProvider>
  );
}

export default App;
