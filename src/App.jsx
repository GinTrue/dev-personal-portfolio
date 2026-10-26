import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    root.classList.add("motion-ready");
    let frame;
    const updateScroll = () => {
      const scrollableHeight = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0);
      root.dataset.scrolled = String(window.scrollY > 600);
      root.dataset.headerScrolled = String(window.scrollY > 30);
      frame = undefined;
    };
    const handleScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateScroll); };
    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}><Hero /><About /><Projects /><Experience /><Testimonials /><Contact /></main>
      <Footer />
      <a href="#home" className="back-to-top icon-button" aria-label="Back to top"><ArrowUp size={18} /></a>
    </>
  );
}
export default App;
