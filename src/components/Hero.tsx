import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";
import MagneticButton from "./MagneticButton";

const useTypewriter = (texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
          setCharIndex(0);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};
import CursorMaskReveal from "./CursorMaskReveal";
const typewriterTexts = [
  "مطور ويب متخصص في التجارب الرقمية المبتكرة",
  "أبني مواقع احترافية بـ React و TypeScript",
  "أصمم واجهات عصرية وسريعة",
  "أحول أفكارك لواقع رقمي مبهر",
];

const TypewriterText = () => {
  const text = useTypewriter(typewriterTexts, 70, 35, 2500);
  return <>{text}</>;
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 px-6 py-20 overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-heartbeat"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-wave delay-1000"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-spin-slow"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.08}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-accent/5 rounded-full blur-2xl animate-glow delay-2000"
          style={{ transform: `translateY(${scrollY * -0.12}px)` }}
        />
      </div>

      {/* Enhanced Particles with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-ping opacity-40 delay-500" style={{ transform: `translateY(${scrollY * -0.2}px)` }} />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce opacity-50 delay-1000" style={{ transform: `translateY(${scrollY * 0.25}px)` }} />
        <div className="absolute bottom-1/3 left-2/3 w-2.5 h-2.5 bg-accent/60 rounded-full animate-pulse opacity-30 delay-1500" style={{ transform: `translateY(${scrollY * -0.15}px)` }} />
      </div>

      <div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        {/* Profile Image with Cursor Mask Reveal - First on mobile */}
        <div className="flex justify-center lg:justify-start animate-fade-in-right delay-1000 order-1 lg:order-2">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-8 bg-primary/5 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-1000" />
            <div className="absolute -inset-4 bg-accent/5 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-all duration-800" />
            <div className="relative overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/20 w-80 h-80 lg:w-96 lg:h-96">
              <CursorMaskReveal
                backgroundImage={profilePhoto}
                foregroundImage={profilePhoto}
                maskSize={120}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-background group-hover:scale-110 animate-pulse">
              <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center lg:text-right space-y-6 animate-fade-in-up order-2 lg:order-1" dir="rtl">
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-right">
              <span className="inline-block animate-bounce-in delay-300 hover:scale-110 transition-transform text-foreground">مرحباً،</span>{" "}
              <span className="inline-block animate-bounce-in delay-500 hover:scale-110 transition-transform text-foreground">أنا</span>{" "}
              <span className="inline-block animate-bounce-in delay-700 hover:scale-125 transition-all duration-300 font-bold tracking-wider drop-shadow-lg animated-gradient-text">
                فارس
              </span>
            </h1>
          </div>
          <div className="animate-fade-in-up delay-400 h-[4rem] flex items-center justify-center lg:justify-end">
            <p className="text-xl lg:text-2xl leading-relaxed text-right my-0 px-0 py-[10px] animated-gradient-text-subtle" dir="rtl">
              <TypewriterText />
              <span className="inline-block w-[3px] h-[1.2em] bg-primary animate-pulse ml-1 align-middle rounded-full" />
            </p>
          </div>
          <div className="animate-fade-in-up delay-600">
            <p className="text-base lg:text-lg text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 hover:text-foreground transition-colors duration-300 text-right font-medium">
              أحول أفكارك إلى مواقع وتطبيقات احترافية بتصميم عصري ووظائف متقدمة
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end animate-fade-in-up delay-800">
            <MagneticButton strength={0.4}>
              <Button size="lg" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-warm-gradient hover:opacity-90 text-white shadow-hero hover:shadow-hero/70 transition-all duration-500 px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-110 hover:-translate-y-2 hover:rotate-1">
                <span className="group-hover:animate-pulse">استكشف أعمالي</span>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-110 hover:-translate-y-2 hover:-rotate-1">
                <span className="group-hover:animate-bounce">تواصل معي</span>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;