import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Root from "./pages/root";
import ErrorPage from "./pages/error-page";
import Check from "./pages/check";
import Failed from "./pages/failed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/check" element={<Check />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
