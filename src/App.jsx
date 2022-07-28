import ScrollToTop from "./base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AppProvider from "./context/AppProvider";
import Router from "./router";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppProvider>
          <Router />
        </AppProvider>
        <ScrollToTop />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
