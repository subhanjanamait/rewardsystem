// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import '@shopify/polaris/styles.css';  // ✅ correct path


// import { AppProvider as PolarisProvider } from "@shopify/polaris";
// import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// const config = {
//   apiKey: process.env.REACT_APP_SHOPIFY_API_KEY, // from .env
//   host: new URLSearchParams(window.location.search).get("host"),
//   forceRedirect: true,
// };

// root.render(
//   <PolarisProvider>
//     <AppBridgeProvider config={config}>
//       <App />
//     </AppBridgeProvider>
//   </PolarisProvider>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "@shopify/polaris/dist/styles.css";
import "@shopify/polaris/build/esm/styles.css";
import "./styles.css"; 

import { AppProvider } from "@shopify/polaris";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider i18n={{}}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
