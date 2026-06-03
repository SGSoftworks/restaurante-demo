import SEO from "../components/SEO";
import useLenis from "../hooks/useLenis";
import Hero from "../components/Hero";
import Story from "../components/Story";
import MenuNav from "../components/MenuNav";
import MenuCategories from "../components/MenuCategories";
import Experience from "../components/Experience";
import Reservation from "../components/Reservation";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function Home() {
  useLenis();

  return (
    <>
      <SEO title="Materia" description="Materia es una experiencia gastronómica donde la alta cocina se encuentra con el arte. Descubre nuestra historia, menú de autor y reserva tu velada." path="/" />
      <PageNav />
      <Hero />
      <div data-section="story"><Story /></div>
      <MenuNav containerId="menu-container" />
      <MenuCategories containerId="menu-container" />
      <Experience />
      <div data-section="reservation"><Reservation /></div>
      <Footer />
    </>
  );
}
