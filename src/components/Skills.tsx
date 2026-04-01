import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

const AnimatedBar = ({ level, color, isVisible }: { level: number; color: string; isVisible: boolean }) => {
  return (
    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${level}%` : "0%",
          background: color,
          transitionDelay: "0.3s",
        }}
      />
    </div>
  );
};

const CountUp = ({ target, isVisible }: { target: number; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
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

  return <span>{count}</span>;
};

const Skills = () => {
  const frontendSkills: Skill[] = [
    { name: "React / Next.js", level: 92, icon: "⚛️", color: "hsl(25, 100%, 55%)" },
    { name: "TypeScript", level: 88, icon: "📘", color: "hsl(35, 90%, 50%)" },
    { name: "JavaScript (ES6+)", level: 95, icon: "⚡", color: "hsl(45, 100%, 50%)" },
    { name: "HTML5 / CSS3", level: 97, icon: "🎯", color: "hsl(15, 85%, 55%)" },
    { name: "Tailwind CSS", level: 93, icon: "🎨", color: "hsl(25, 80%, 50%)" },
  ];

  const otherSkills: Skill[] = [
    { name: "Git / GitHub", level: 85, icon: "🔀", color: "hsl(0, 0%, 60%)" },
    { name: "REST APIs", level: 90, icon: "🔌", color: "hsl(25, 70%, 55%)" },
    { name: "Responsive Design", level: 96, icon: "📱", color: "hsl(35, 80%, 50%)" },
    { name: "Performance Optimization", level: 82, icon: "🚀", color: "hsl(45, 90%, 50%)" },
    { name: "UI/UX Principles", level: 87, icon: "✨", color: "hsl(15, 75%, 55%)" },
  ];

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: leftRef, isVisible: leftVisible } = useScrollAnimation({ threshold: 0.15 });
  const { elementRef: rightRef, isVisible: rightVisible } = useScrollAnimation({ threshold: 0.15 });

  const renderSkillGroup = (skills: Skill[], isVisible: boolean) => (
    <div className="space-y-5">
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          className="group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(20px)",
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg group-hover:scale-125 transition-transform duration-300 inline-block">
                {skill.icon}
              </span>
              <span className="text-sm font-semibold text-foreground">{skill.name}</span>
            </div>
            <span className="text-xs font-bold text-primary tabular-nums">
              {isVisible ? <CountUp target={skill.level} isVisible={isVisible} /> : 0}%
            </span>
          </div>
          <AnimatedBar level={skill.level} color={skill.color} isVisible={isVisible} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden" id="skills">
      {/* Subtle bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            مهاراتي التقنية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ textWrap: "balance" }}>
            أدوات وتقنيات أستخدمها يومياً لبناء تجارب رقمية استثنائية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div ref={leftRef}>
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              Frontend Development
            </h3>
            {renderSkillGroup(frontendSkills, leftVisible)}
          </div>
          <div ref={rightRef}>
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              أدوات ومهارات إضافية
            </h3>
            {renderSkillGroup(otherSkills, rightVisible)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
