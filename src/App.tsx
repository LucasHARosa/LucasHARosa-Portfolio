import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "@/pages/Blog";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";
import { Skills } from "@/pages/Skills";
import { Templates } from "@/pages/Templates";
import { Tools } from "@/pages/Tools";
import { Tool } from "@/pages/Tools/Tool";

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/ferramentas" element={<Tools />} />
          <Route path="/ferramentas/:slug" element={<Tool />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
