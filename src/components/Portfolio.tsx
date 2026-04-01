import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Tilt3DCard from "./Tilt3DCard";
import MagneticButton from "./MagneticButton";

import quranImage from "@/assets/quran-kariem.png";
import gamingImage from "@/assets/elfares-gaming.png";
import portfolioImage from "@/assets/nextvision.png";
import gymImage from "@/assets/gym.png";
import multiToolsImage from "/lovable-uploads/6ce00e27-5970-499d-bd8f-c2e962ce115e.png";

const Portfolio = () => {
  const projects = [
    {
      title: "القرآن الكريم",
      description: "موقع إسلامي منظم لقراءة القرآن الكريم مع خدمة البحث في السور والآيات، وتصميم متجاوب وتجربة مستخدم مميزة",
      image: quranImage,
      tech: ["React", "Next.js", "Tailwind CSS"],
      category: "تطوير ويب",
      liveUrl: "https://al-quran-al-kareem-hilt.vercel.app/",
    },
    {
      title: "منصة ElFares للألعاب",
      description: "الوجهة الأولى لأفضل الألعاب التفاعلية مع أكثر من 30 لعبة ممتعة مع تأثيرات بصرية جذابة وتجربة لعب لا تُنسى",
      image: gamingImage,
      tech: ["React", "JavaScript", "CSS3"],
      category: "منصة ألعاب",
      liveUrl: "https://el-fares-games-nine.vercel.app/",
    },
    {
      title: "بورتفوليو NextVision الشخصي",
      description: "بورتفوليو شخصي احترافي لمطور Front-End مع عرض الأعمال والمشاريع بطريقة إبداعية وجذابة",
      image: portfolioImage,
      tech: ["React", "TypeScript", "Framer Motion"],
      category: "بورتفوليو شخصي",
      liveUrl: "https://next-vision-rose.vercel.app/",
    },
    {
      title: "نظام إدارة الصالة الرياضية",
      description: "إدارة شاملة لأعضاء النادي الرياضي والاشتراكات مع واجهة سهلة الاستخدام ونظام إدارة متطور",
      image: gymImage,
      tech: ["React", "Node.js", "MongoDB"],
      category: "نظام إدارة",
      liveUrl: "https://my-coach-helper.vercel.app/",
    },
    {
      title: "الأدوات اليومية الذكية",
      description: "مجموعة شاملة من 40 أداة ذكية ومفيدة تضم آلة حاسبة ومحول عملات وملاحظات ومهام وأدوات إنتاجية أخرى في مكان واحد",
      image: multiToolsImage,
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      category: "أدوات إنتاجية",
      liveUrl: "https://multi-tools-snowy.vercel.app/",
    },
  ];

  return (
    <section className="py-24 px-6 bg-soft-gradient" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              معرض أعمالي
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ textWrap: "balance" }}>
              مجموعة مختارة من أحدث مشاريعي التي تُظهر مهاراتي في التطوير والتصميم
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 80}
              distance={24}
            >
              <Tilt3DCard maxTilt={10}>
                <Card className="border-0 shadow-card hover:shadow-2xl transition-all duration-500 bg-card group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.description.slice(0, 80)}`}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          معاينة مباشرة
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-lg font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <MagneticButton strength={0.25}>
                        <Button
                          size="sm"
                          className="w-full bg-warm-gradient hover:opacity-90 text-primary-foreground transition-all duration-300"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          عرض المشروع
                        </Button>
                      </MagneticButton>
                    </div>
                  </CardContent>
                </Card>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
