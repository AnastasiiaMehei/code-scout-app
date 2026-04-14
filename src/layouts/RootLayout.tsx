import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global";
import { Header } from "../components/Header";
import { Main } from "../styles/Main.styled";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { theme } from "../styles/theme";

export const RootLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </ThemeProvider>
  );
};
