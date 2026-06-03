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
      <PageNav />
      <Hero />
      <Story />
      <MenuNav containerId="menu-container" />
      <MenuCategories containerId="menu-container" />
      <Experience />
      <Reservation />
      <Footer />
    </>
  );
}
