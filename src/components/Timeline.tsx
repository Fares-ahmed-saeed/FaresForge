import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";
import { ReactNode } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: ReactNode;
  type: "work" | "education" | "achievement";
}

const Timeline = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });

  const items: TimelineItem[] = [
    {
      year: "2022",
      title: "بداية رحلة البرمجة",
      description: "تعلم أساسيات HTML وCSS وJavaScript وبناء أولى المشاريع الشخصية",
      icon: <GraduationCap className="w-5 h-5" />,
      type: "education",
    },
    {
      year: "2023",
      title: "شهادات تقنية متقدمة",
      description: "الحصول على شهادات في تطوير الويب وهندسة البرمجيات من منصات تعليمية عالمية",
      icon: <Award className="w-5 h-5" />,
      type: "achievement",
    },
    {
      year: "2023",
      title: "إتقان React و TypeScript",
      description: "بناء تطبيقات ويب تفاعلية ومشاريع متعددة للعملاء مع تطبيق أفضل الممارسات في هندسة البرمجيات",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work",
    },
    {
      year: "2024",
      title: "مطور واجهات أمامية محترف",
      description: "تطوير مشاريع متقدمة باستخدام React وNext.js وTypeScript مع التركيز على الأداء وتجربة المستخدم",
      icon: <Rocket className="w-5 h-5" />,
      type: "work",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden" id="timeline">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            مسيرتي المهنية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ textWrap: "balance" as any }}>
            رحلتي في عالم البرمجة وتطوير الويب من البداية حتى الآن
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden" />

          {items.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={elementRef}
      className={`relative flex items-center mb-12 last:mb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(30px)`,
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      {/* Dot on line */}
      <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-background" />

      {/* Content */}
      <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
        <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {item.year}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
