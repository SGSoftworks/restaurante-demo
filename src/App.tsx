import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductShowcase from "./pages/ProductShowcase";
import SignatureCollection from "./pages/SignatureCollection";
import ProductDetail from "./pages/ProductDetail";
import ChefRecommendations from "./pages/ChefRecommendations";
import SeasonalSpecials from "./pages/SeasonalSpecials";
import Gallery from "./pages/Gallery";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<ProductShowcase />} />
        <Route path="/coleccion" element={<SignatureCollection />} />
        <Route path="/producto/:slug" element={<ProductDetail />} />
        <Route path="/chef" element={<ChefRecommendations />} />
        <Route path="/temporada" element={<SeasonalSpecials />} />
        <Route path="/galeria" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
