import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { BuilderPage } from "@/pages/BuilderPage";
import { LandingPage } from "@/pages/LandingPage";
import { ReadmeConfigProvider } from "@/state/readme-config";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ReadmeConfigProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
    </ReadmeConfigProvider>
  );
}

export default App;
