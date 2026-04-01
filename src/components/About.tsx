import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { Code2, Palette, Zap, Users } from "lucide-react";

const CountUp = ({ target, suffix = "", isVisible }: { target: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return <>{count}{suffix}</>;
};

const About = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.15 });

  const stats = [
    { value: 20, suffix: "+", label: "مشروع مكتمل" },
    { value: 15, suffix: "+", label: "عميل سعيد" },
    { value: 2, suffix: "+", label: "سنوات خبرة" },
    { value: 5, suffix: "+", label: "تقنية متقنة" },
  ];

  const highlights = [
    {
      icon: Code2,
      title: "كود نظيف",
      desc: "أكتب كود منظم وقابل للصيانة باستخدام أحدث المعايير والممارسات",
    },
    {
      icon: Palette,
      title: "تصميم عصري",
      desc: "أصمم واجهات جذابة تجمع بين الجمال وسهولة الاستخدام",
    },
    {
      icon: Zap,
      title: "أداء عالي",
      desc: "أحرص على سرعة التحميل وتجربة مستخدم سلسة على كل الأجهزة",
    },
    {
      icon: Users,
      title: "تواصل فعّال",
      desc: "أعمل بشكل وثيق مع العملاء لضمان تحقيق رؤيتهم بدقة",
    },
  ];

  return (
    <section className="py-24 px-6 bg-soft-gradient relative overflow-hidden" id="about">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            من أنا؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ textWrap: "balance" }}>
            أنا <span className="text-primary font-semibold">فارس أحمد</span>، مطور واجهات أمامية.
            أحول الأفكار إلى تجارب رقمية تفاعلية باستخدام React وTypeScript وأحدث تقنيات الويب.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1 tabular-nums">
                <CountUp target={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Highlight Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible
                    ? "translateY(0)"
                    : i % 2 === 0
                    ? "translateX(-20px)"
                    : "translateX(20px)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
