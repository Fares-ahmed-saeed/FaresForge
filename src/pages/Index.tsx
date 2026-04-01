import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";

import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import ParticlesBackground from "@/components/ParticlesBackground";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <ParticlesBackground />
      <CustomCursor />
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="timeline">
          <Timeline />
        </section>


        <section id="contact">
          <Contact />
        </section>
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
