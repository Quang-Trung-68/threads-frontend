import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import NiceModal from "@ebay/nice-modal-react";
import { ThemeProvider } from "@/components/Common/ThemeProvider";

import "@/index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NiceModal.Provider>
      <ThemeProvider defaultTheme="system" attribute="class">
        <App />
      </ThemeProvider>
    </NiceModal.Provider>
  </Provider>,
);
