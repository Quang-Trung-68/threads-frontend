import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import NiceModal from "@ebay/nice-modal-react";
import { ThemeProvider } from "@/components/Common/ThemeProvider";
import { TooltipProvider } from "@/components/Common/ui/tooltip";

import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import i18n from "./i18n/config";
import "@/index.css";

// Apply global error map with custom wrapper
const customErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.custom && issue.params?.i18n) {
    return { message: i18n.t(`validation:${issue.params.i18n}`) };
  }
  return zodI18nMap(issue, ctx);
};

z.setErrorMap(customErrorMap);

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <NiceModal.Provider>
        <ThemeProvider defaultTheme="system" attribute="class">
          <TooltipProvider delayDuration={300}>
            <App />
          </TooltipProvider>
        </ThemeProvider>
      </NiceModal.Provider>
    </BrowserRouter>
  </Provider>,
);
