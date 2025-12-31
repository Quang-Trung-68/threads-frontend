import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import NiceModal from "@ebay/nice-modal-react";
import { ThemeProvider } from "@/components/Common/ThemeProvider";
import { TooltipProvider } from "@/components/Common/ui/tooltip";

import * as z from "zod";
import { vi, en } from "zod/locales";
import i18n from "./i18n/config";

import "@/index.css";

const applyZodLocale = (language) => {
  switch (language) {
    case "vi":
      z.config(vi());
      break;
    case "en":
    default:
      z.config(en());
      break;
  }
};

// Apply initial locale
applyZodLocale(i18n.language);

// Update locale on language change
i18n.on("languageChanged", (lng) => {
  applyZodLocale(lng);
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NiceModal.Provider>
      <ThemeProvider defaultTheme="system" attribute="class">
        <TooltipProvider delayDuration={300}>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </NiceModal.Provider>
  </Provider>,
);
