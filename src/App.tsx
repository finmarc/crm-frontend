// import "dotenv/config"
import ScrollToTop from "./base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AppProvider from "./contexts";
import Router from "./router";
import { Toaster } from "react-hot-toast";
import 'react-tailwindcss-select/dist/index.css'
function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <AppProvider>
            <Router />
          </AppProvider>
          <ScrollToTop />
        </BrowserRouter>
      </RecoilRoot>

      <Toaster />
    </>
  );
}

export default App;
