import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "@/pages/Blog";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
