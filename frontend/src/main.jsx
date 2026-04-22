// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind import

// 🔥 Redux
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// 🔥 React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔥 Toast
import { Toaster } from "react-hot-toast";

// 🔹 Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        
        {/* 🔔 Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#18181b", // zinc-900
              color: "#fff",
            },
          }}
        />

        <App />
        
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);